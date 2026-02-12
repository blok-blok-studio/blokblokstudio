import crypto from 'crypto';
import { prisma } from './prisma';

export type VerifyResult = 'valid' | 'invalid' | 'risky' | 'catch_all' | 'disposable' | 'unknown';

export interface VerificationResult {
  email: string;
  result: VerifyResult;
  details: {
    syntax: boolean;
    mxExists: boolean;
    disposable: boolean;
    catchAll: boolean;
    roleAccount: boolean;
    smtpCheck: 'passed' | 'failed' | 'skipped' | 'greylisted' | 'blocked';
    smtpResponse?: string;
  };
  reason: string;
}

interface ProxyResult {
  email: string;
  result: VerifyResult;
  smtp: string;
  smtpCode?: number;
  smtpResponse?: string;
  reason: string;
  mxHost?: string;
  isRole?: boolean;
}

/**
 * Sign a request for the verification proxy using HMAC-SHA256.
 * Payload = timestamp + "." + body
 */
function signRequest(body: string, secret: string): { timestamp: string; signature: string } {
  const timestamp = Date.now().toString();
  const payload = `${timestamp}.${body}`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return { timestamp, signature };
}

/**
 * Call the VPS verification proxy to verify emails via SMTP.
 * Falls back to basic (non-SMTP) verification if proxy is not configured.
 */
async function callVerifyProxy(emails: string[]): Promise<ProxyResult[]> {
  const proxyUrl = process.env.VERIFY_PROXY_URL;
  const proxySecret = process.env.VERIFY_PROXY_SECRET;

  if (!proxyUrl || !proxySecret) {
    // No proxy configured — return all as unknown with a helpful message
    return emails.map(email => ({
      email: email.trim().toLowerCase(),
      result: 'unknown' as VerifyResult,
      smtp: 'skipped',
      reason: 'SMTP proxy not configured — set VERIFY_PROXY_URL and VERIFY_PROXY_SECRET env vars',
    }));
  }

  const body = JSON.stringify({ emails });
  const { timestamp, signature } = signRequest(body, proxySecret);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000); // 2 min timeout for batch

  try {
    const res = await fetch(`${proxyUrl}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Timestamp': timestamp,
        'X-Signature': signature,
      },
      body,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errData.error || `Proxy returned ${res.status}`);
    }

    const data = await res.json();
    return data.results as ProxyResult[];
  } catch (err) {
    clearTimeout(timeout);
    const msg = err instanceof Error ? err.message : String(err);
    return emails.map(email => ({
      email: email.trim().toLowerCase(),
      result: 'unknown' as VerifyResult,
      smtp: 'error',
      reason: `Proxy error: ${msg}`,
    }));
  }
}

/**
 * Convert a proxy result to a full VerificationResult
 */
function proxyToVerification(pr: ProxyResult): VerificationResult {
  return {
    email: pr.email,
    result: pr.result,
    details: {
      syntax: pr.result !== 'invalid' || pr.smtp !== 'skipped',
      mxExists: pr.smtp !== 'skipped' || pr.result === 'valid' || pr.result === 'risky' || pr.result === 'catch_all',
      disposable: pr.result === 'disposable',
      catchAll: pr.result === 'catch_all',
      roleAccount: pr.isRole || false,
      smtpCheck: (pr.smtp as VerificationResult['details']['smtpCheck']) || 'skipped',
      smtpResponse: pr.smtpResponse || pr.reason,
    },
    reason: pr.reason,
  };
}

/**
 * Verify a single email address via the proxy
 */
export async function verifyEmail(email: string): Promise<VerificationResult> {
  const results = await callVerifyProxy([email]);
  return proxyToVerification(results[0]);
}

/**
 * Verify multiple emails in batch, updating the database.
 * Sends all emails to the proxy in one request (up to 50),
 * then updates each lead in the database.
 */
export async function verifyLeadEmails(leadIds: string[]): Promise<{ verified: number; results: Record<VerifyResult, number> }> {
  const leads = await prisma.lead.findMany({
    where: { id: { in: leadIds } },
    select: { id: true, email: true },
  });

  const counts: Record<VerifyResult, number> = {
    valid: 0, invalid: 0, risky: 0, catch_all: 0, disposable: 0, unknown: 0,
  };

  // Batch emails to proxy (chunks of 50)
  const BATCH_SIZE = 50;
  const emailToLeadId = new Map<string, string>();
  for (const lead of leads) {
    emailToLeadId.set(lead.email.trim().toLowerCase(), lead.id);
  }

  const allEmails = leads.map(l => l.email);

  for (let i = 0; i < allEmails.length; i += BATCH_SIZE) {
    const batch = allEmails.slice(i, i + BATCH_SIZE);
    const proxyResults = await callVerifyProxy(batch);

    for (const pr of proxyResults) {
      const leadId = emailToLeadId.get(pr.email);
      if (!leadId) continue;

      counts[pr.result] = (counts[pr.result] || 0) + 1;

      try {
        await prisma.lead.update({
          where: { id: leadId },
          data: {
            emailVerified: true,
            verifyResult: pr.result,
            verifiedAt: new Date(),
          },
        });
      } catch {
        // Lead may have been deleted
      }
    }
  }

  return { verified: leads.length, results: counts };
}

/**
 * Process spintax in text: {Hello|Hi|Hey} → randomly picks one
 */
export function processSpintax(text: string): string {
  return text.replace(/\{([^{}]+)\}/g, (_match, group: string) => {
    const options = group.split('|');
    return options[Math.floor(Math.random() * options.length)];
  });
}

/**
 * Pick an A/B variant based on weights
 */
export function pickVariant(variants: { subject: string; body: string; weight: number }[]): { subject: string; body: string } {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const variant of variants) {
    rand -= variant.weight;
    if (rand <= 0) return { subject: variant.subject, body: variant.body };
  }
  return variants[0];
}
