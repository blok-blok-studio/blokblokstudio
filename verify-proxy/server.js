#!/usr/bin/env node
/**
 * Email Verification Proxy — runs on a VPS with port 25 open.
 * Zero dependencies. Pure Node.js.
 *
 * Security:
 *  1. HMAC-SHA256 request signing (shared secret)
 *  2. Timestamp expiry (60s window — blocks replay attacks)
 *  3. Per-IP rate limiting (max 20 req/min)
 *  4. IP allowlist (optional — restrict to Vercel IPs)
 *  5. Single endpoint only — no attack surface
 *  6. Request body validation + size limit (1MB)
 *  7. Auto-ban after 10 failed auth attempts
 */

const http = require('http');
const crypto = require('crypto');
const dns = require('dns');
const net = require('net');
const os = require('os');

// ── Config (set via environment variables) ──
const PORT = parseInt(process.env.PORT || '3001', 10);
const SHARED_SECRET = process.env.SHARED_SECRET || '';
const ALLOWED_IPS = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',').map(s => s.trim()) : [];
const MAX_BATCH = parseInt(process.env.MAX_BATCH || '50', 10);
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 20; // requests per window
const AUTH_BAN_THRESHOLD = 10; // ban after N failed auths
const AUTH_BAN_DURATION = 3600000; // 1 hour ban
const TIMESTAMP_TOLERANCE = 60000; // 60 second window for request timestamps

if (!SHARED_SECRET || SHARED_SECRET.length < 32) {
  console.error('FATAL: SHARED_SECRET must be set and at least 32 characters.');
  console.error('Generate one: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"');
  process.exit(1);
}

// ── Rate limiter (in-memory) ──
const rateLimits = new Map(); // ip -> { count, resetAt }
const authBans = new Map(); // ip -> banUntil

function checkRateLimit(ip) {
  // Check auth ban
  const banUntil = authBans.get(ip);
  if (banUntil && Date.now() < banUntil) {
    return { allowed: false, reason: 'IP banned due to repeated auth failures' };
  }
  if (banUntil && Date.now() >= banUntil) {
    authBans.delete(ip);
  }

  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW, authFails: entry?.authFails || 0 });
    return { allowed: true };
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return { allowed: false, reason: `Rate limit exceeded (${RATE_LIMIT_MAX}/min)` };
  }

  return { allowed: true };
}

function recordAuthFailure(ip) {
  const entry = rateLimits.get(ip);
  if (entry) {
    entry.authFails = (entry.authFails || 0) + 1;
    if (entry.authFails >= AUTH_BAN_THRESHOLD) {
      authBans.set(ip, Date.now() + AUTH_BAN_DURATION);
      console.log(`[BAN] ${ip} banned for ${AUTH_BAN_DURATION / 1000}s after ${AUTH_BAN_THRESHOLD} auth failures`);
    }
  }
}

// Clean up stale rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimits) {
    if (now > entry.resetAt + 300000) rateLimits.delete(ip);
  }
  for (const [ip, banUntil] of authBans) {
    if (now > banUntil) authBans.delete(ip);
  }
}, 300000);

// ── HMAC verification ──
function verifySignature(timestamp, body, signature) {
  const now = Date.now();
  const ts = parseInt(timestamp, 10);

  // Check timestamp is within tolerance window
  if (isNaN(ts) || Math.abs(now - ts) > TIMESTAMP_TOLERANCE) {
    return { valid: false, reason: 'Request expired or invalid timestamp' };
  }

  // Compute expected signature: HMAC-SHA256(timestamp + "." + body, secret)
  const payload = `${timestamp}.${body}`;
  const expected = crypto.createHmac('sha256', SHARED_SECRET).update(payload).digest('hex');

  // Constant-time comparison to prevent timing attacks
  if (expected.length !== signature.length) {
    return { valid: false, reason: 'Invalid signature' };
  }

  const valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  return valid ? { valid: true } : { valid: false, reason: 'Invalid signature' };
}

// ── DNS MX lookup ──
function checkMX(domain) {
  return new Promise((resolve) => {
    dns.resolveMx(domain, (err, records) => {
      if (err || !records || records.length === 0) {
        resolve({ exists: false, records: [] });
      } else {
        resolve({ exists: true, records: records.sort((a, b) => a.priority - b.priority) });
      }
    });
  });
}

// ── SMTP handshake verification ──
function smtpVerify(email, mxHost) {
  const TIMEOUT = 10000;
  const hostname = os.hostname() || 'verify.proxy';

  return new Promise((resolve) => {
    let resolved = false;
    let step = 'banner'; // banner → ehlo → mailfrom → rcptto → quit

    const done = (status, code, response) => {
      if (resolved) return;
      resolved = true;
      try { socket.destroy(); } catch {}
      resolve({ status, code, response });
    };

    const timer = setTimeout(() => done('blocked', 0, 'Connection timed out'), TIMEOUT);

    const socket = net.createConnection({ host: mxHost, port: 25, timeout: TIMEOUT });
    socket.setEncoding('utf-8');

    socket.on('error', () => { clearTimeout(timer); done('blocked', 0, 'Connection error'); });
    socket.on('timeout', () => { clearTimeout(timer); done('blocked', 0, 'Socket timeout'); });

    socket.on('data', (data) => {
      const lines = data.split('\r\n').filter(Boolean);
      const lastLine = lines[lines.length - 1];
      if (!lastLine) return;
      const code = parseInt(lastLine.substring(0, 3), 10);
      if (lastLine.length > 3 && lastLine[3] === '-') return; // multi-line response
      if (isNaN(code)) return;

      switch (step) {
        case 'banner':
          if (code === 220) { step = 'ehlo'; socket.write(`EHLO ${hostname}\r\n`); }
          else { clearTimeout(timer); done('blocked', code, lastLine); }
          break;
        case 'ehlo':
          if (code === 250) { step = 'mailfrom'; socket.write(`MAIL FROM:<verify@${hostname}>\r\n`); }
          else { clearTimeout(timer); done('blocked', code, lastLine); }
          break;
        case 'mailfrom':
          if (code === 250) { step = 'rcptto'; socket.write(`RCPT TO:<${email}>\r\n`); }
          else { clearTimeout(timer); done('blocked', code, lastLine); }
          break;
        case 'rcptto':
          step = 'quit';
          socket.write('QUIT\r\n');
          clearTimeout(timer);
          if (code === 250 || code === 251) done('passed', code, lastLine);
          else if (code >= 550 && code <= 559) done('failed', code, lastLine);
          else if (code >= 450 && code <= 459) done('greylisted', code, lastLine);
          else if (code === 421) done('blocked', code, lastLine);
          else if (code >= 500) done('failed', code, lastLine);
          else done('greylisted', code, lastLine);
          break;
      }
    });

    socket.on('close', () => {
      clearTimeout(timer);
      if (!resolved) done('blocked', 0, 'Connection closed unexpectedly');
    });
  });
}

// ── Catch-all detection ──
async function detectCatchAll(domain, mxHost) {
  const random = `blkvrfy-${crypto.randomBytes(8).toString('hex')}@${domain}`;
  try {
    const result = await smtpVerify(random, mxHost);
    return result.status === 'passed';
  } catch {
    return false;
  }
}

// ── Disposable domains ──
const DISPOSABLE_DOMAINS = new Set([
  'tempmail.com','throwaway.email','guerrillamail.com','mailinator.com','trashmail.com',
  'yopmail.com','10minutemail.com','temp-mail.org','fakeinbox.com','sharklasers.com',
  'guerrillamailblock.com','grr.la','dispostable.com','mailnesia.com','maildrop.cc',
  'discard.email','33mail.com','getnada.com','mohmal.com','emailondeck.com',
  'tempail.com','tempr.email','tmail.io','burnermail.io','inboxkitten.com',
  'mailsac.com','anonbox.net','mintemail.com','tempmailaddress.com','tmpmail.net',
  'tempinbox.com','emailfake.com','crazymailing.com','armyspy.com','dayrep.com',
  'einrot.com','fleckens.hu','gustr.com','jourrapide.com','rhyta.com','superrito.com',
  'teleworm.us','mailcatch.com','trashmail.me','mytrashmail.com','mt2015.com',
]);

const SMTP_BLOCKED_PROVIDERS = new Set([
  'gmail.com','googlemail.com','outlook.com','hotmail.com','live.com','msn.com',
  'outlook.co.uk','icloud.com','me.com','mac.com','aol.com',
  'protonmail.com','proton.me','pm.me','zoho.com','zohomail.com',
  'fastmail.com','tutanota.com','tuta.com',
]);

const KNOWN_CATCH_ALL = new Set(['yahoo.com','yahoo.co.uk','ymail.com','rocketmail.com']);

const ROLE_ACCOUNTS = new Set([
  'admin','info','support','contact','sales','hello','help','billing',
  'security','abuse','postmaster','webmaster','noreply','no-reply',
  'office','team','hr','marketing','feedback',
]);

// ── Full email verification ──
async function verifyEmail(email) {
  const trimmed = email.trim().toLowerCase();
  const atIdx = trimmed.indexOf('@');
  if (atIdx === -1) return { email: trimmed, result: 'invalid', smtp: 'skipped', reason: 'No @ symbol' };

  const local = trimmed.substring(0, atIdx);
  const domain = trimmed.substring(atIdx + 1);

  // Syntax
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
    return { email: trimmed, result: 'invalid', smtp: 'skipped', reason: 'Invalid format' };
  }

  // Disposable
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { email: trimmed, result: 'disposable', smtp: 'skipped', reason: `Disposable provider: ${domain}` };
  }

  // MX check
  const mx = await checkMX(domain);
  if (!mx.exists) {
    return { email: trimmed, result: 'invalid', smtp: 'skipped', reason: `No MX records for ${domain}` };
  }

  const mxHost = mx.records[0].exchange;
  const isRole = ROLE_ACCOUNTS.has(local);

  // SMTP-blocked providers
  if (SMTP_BLOCKED_PROVIDERS.has(domain)) {
    return { email: trimmed, result: 'risky', smtp: 'blocked', reason: `${domain} blocks SMTP verification`, mxHost, isRole };
  }

  // Known catch-all
  if (KNOWN_CATCH_ALL.has(domain)) {
    return { email: trimmed, result: 'catch_all', smtp: 'skipped', reason: `${domain} is catch-all`, mxHost, isRole };
  }

  // SMTP handshake
  const smtp = await smtpVerify(trimmed, mxHost);

  if (smtp.status === 'failed') {
    return { email: trimmed, result: 'invalid', smtp: 'failed', smtpCode: smtp.code, smtpResponse: smtp.response, reason: `Mailbox does not exist: ${smtp.response}`, mxHost, isRole };
  }

  if (smtp.status === 'blocked') {
    return { email: trimmed, result: 'risky', smtp: 'blocked', smtpResponse: smtp.response, reason: `SMTP blocked: ${smtp.response}`, mxHost, isRole };
  }

  if (smtp.status === 'greylisted') {
    return { email: trimmed, result: 'risky', smtp: 'greylisted', smtpCode: smtp.code, smtpResponse: smtp.response, reason: `Greylisted: ${smtp.response}`, mxHost, isRole };
  }

  // Catch-all detection
  const isCatchAll = await detectCatchAll(domain, mxHost);
  if (isCatchAll) {
    return { email: trimmed, result: 'catch_all', smtp: 'passed', smtpResponse: smtp.response, reason: `${domain} accepts all addresses (catch-all)`, mxHost, isRole };
  }

  // Role account
  if (isRole) {
    return { email: trimmed, result: 'risky', smtp: 'passed', smtpResponse: smtp.response, reason: `Role-based account (${local}@)`, mxHost };
  }

  // All good
  return { email: trimmed, result: 'valid', smtp: 'passed', smtpResponse: smtp.response, reason: 'SMTP verified — mailbox exists', mxHost };
}

// ── HTTP Server ──
const server = http.createServer(async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');

  // IP allowlist check
  if (ALLOWED_IPS.length > 0 && !ALLOWED_IPS.includes(ip) && ip !== '127.0.0.1' && ip !== '::1') {
    console.log(`[BLOCKED] ${ip} not in allowlist`);
    res.writeHead(403);
    res.end(JSON.stringify({ error: 'Forbidden' }));
    return;
  }

  // Rate limit check
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    console.log(`[RATE_LIMIT] ${ip}: ${rl.reason}`);
    res.writeHead(429);
    res.end(JSON.stringify({ error: rl.reason }));
    return;
  }

  // Only accept POST /verify
  if (req.method !== 'POST' || req.url !== '/verify') {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  // Read body with size limit
  let body = '';
  let tooLarge = false;

  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 1048576) { // 1MB limit
      tooLarge = true;
      req.destroy();
    }
  });

  req.on('end', async () => {
    if (tooLarge) {
      res.writeHead(413);
      res.end(JSON.stringify({ error: 'Request too large' }));
      return;
    }

    // Verify HMAC signature
    const timestamp = req.headers['x-timestamp'];
    const signature = req.headers['x-signature'];

    if (!timestamp || !signature) {
      recordAuthFailure(ip);
      console.log(`[AUTH_FAIL] ${ip}: Missing signature headers`);
      res.writeHead(401);
      res.end(JSON.stringify({ error: 'Missing authentication' }));
      return;
    }

    const auth = verifySignature(timestamp, body, signature);
    if (!auth.valid) {
      recordAuthFailure(ip);
      console.log(`[AUTH_FAIL] ${ip}: ${auth.reason}`);
      res.writeHead(401);
      res.end(JSON.stringify({ error: auth.reason }));
      return;
    }

    // Parse body
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }

    const { emails } = parsed;
    if (!Array.isArray(emails) || emails.length === 0) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Provide an array of emails' }));
      return;
    }

    if (emails.length > MAX_BATCH) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: `Max ${MAX_BATCH} emails per request` }));
      return;
    }

    // Validate all entries are strings
    if (!emails.every(e => typeof e === 'string' && e.length < 320)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid email entries' }));
      return;
    }

    console.log(`[VERIFY] ${ip}: ${emails.length} emails`);

    // Verify each email
    const results = [];
    for (const email of emails) {
      try {
        const result = await verifyEmail(email);
        results.push(result);
      } catch (err) {
        results.push({ email, result: 'unknown', smtp: 'error', reason: 'Verification error' });
      }
      // 500ms between SMTP checks
      if (emails.length > 1) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    const counts = { valid: 0, invalid: 0, risky: 0, catch_all: 0, disposable: 0, unknown: 0 };
    for (const r of results) counts[r.result] = (counts[r.result] || 0) + 1;

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, results, counts, verified: results.length }));
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Email Verification Proxy running on port ${PORT}`);
  console.log(`Security: HMAC-SHA256 signing, ${TIMESTAMP_TOLERANCE / 1000}s timestamp window, ${RATE_LIMIT_MAX} req/min rate limit`);
  if (ALLOWED_IPS.length > 0) console.log(`IP allowlist: ${ALLOWED_IPS.join(', ')}`);
  else console.log('IP allowlist: DISABLED (all IPs allowed — set ALLOWED_IPS to restrict)');
});
