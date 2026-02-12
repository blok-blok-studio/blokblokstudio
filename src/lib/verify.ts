import dns from 'dns';
import { prisma } from './prisma';

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

// Common catch-all domains (mail servers that accept all addresses)
const KNOWN_CATCH_ALL = new Set([
  'yahoo.com', 'yahoo.co.uk', 'ymail.com', 'rocketmail.com',
]);

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
  };
  reason: string;
}

/**
 * Validate email syntax
 */
function isValidSyntax(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

/**
 * Check if the domain has MX records
 */
async function checkMX(domain: string): Promise<{ exists: boolean; records: dns.MxRecord[] }> {
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

/**
 * Check if the domain is disposable
 */
function isDisposable(domain: string): boolean {
  return DISPOSABLE_DOMAINS.has(domain.toLowerCase());
}

/**
 * Check if the email is a role-based account (low engagement)
 */
function isRoleAccount(local: string): boolean {
  const roles = [
    'admin', 'info', 'support', 'contact', 'sales', 'hello', 'help',
    'billing', 'security', 'abuse', 'postmaster', 'webmaster', 'noreply',
    'no-reply', 'office', 'team', 'hr', 'marketing', 'feedback',
  ];
  return roles.includes(local.toLowerCase());
}

/**
 * Verify a single email address — checks syntax, MX, disposable, role-based
 */
export async function verifyEmail(email: string): Promise<VerificationResult> {
  const trimmed = email.trim().toLowerCase();
  const [local, domain] = trimmed.split('@');

  // 1. Syntax check
  if (!isValidSyntax(trimmed) || !local || !domain) {
    return {
      email: trimmed,
      result: 'invalid',
      details: { syntax: false, mxExists: false, disposable: false, catchAll: false, roleAccount: false },
      reason: 'Invalid email format',
    };
  }

  // 2. Disposable check
  if (isDisposable(domain)) {
    return {
      email: trimmed,
      result: 'disposable',
      details: { syntax: true, mxExists: true, disposable: true, catchAll: false, roleAccount: false },
      reason: `Disposable email provider: ${domain}`,
    };
  }

  // 3. MX record check
  const mx = await checkMX(domain);
  if (!mx.exists) {
    return {
      email: trimmed,
      result: 'invalid',
      details: { syntax: true, mxExists: false, disposable: false, catchAll: false, roleAccount: false },
      reason: `Domain ${domain} has no mail server (no MX records)`,
    };
  }

  // 4. Catch-all check
  const catchAll = KNOWN_CATCH_ALL.has(domain.toLowerCase());

  // 5. Role-based check
  const roleAccount = isRoleAccount(local);

  // Determine final result
  if (catchAll) {
    return {
      email: trimmed,
      result: 'catch_all',
      details: { syntax: true, mxExists: true, disposable: false, catchAll: true, roleAccount },
      reason: `${domain} is a catch-all domain — address may or may not exist`,
    };
  }

  if (roleAccount) {
    return {
      email: trimmed,
      result: 'risky',
      details: { syntax: true, mxExists: true, disposable: false, catchAll: false, roleAccount: true },
      reason: `Role-based account (${local}@) — typically low engagement`,
    };
  }

  return {
    email: trimmed,
    result: 'valid',
    details: { syntax: true, mxExists: true, disposable: false, catchAll: false, roleAccount: false },
    reason: 'Valid email — MX records found, not disposable',
  };
}

/**
 * Verify multiple emails in batch, updating the database
 */
export async function verifyLeadEmails(leadIds: string[]): Promise<{ verified: number; results: Record<VerifyResult, number> }> {
  const leads = await prisma.lead.findMany({
    where: { id: { in: leadIds } },
    select: { id: true, email: true },
  });

  const counts: Record<VerifyResult, number> = {
    valid: 0, invalid: 0, risky: 0, catch_all: 0, disposable: 0, unknown: 0,
  };

  for (const lead of leads) {
    try {
      const result = await verifyEmail(lead.email);
      counts[result.result]++;
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          emailVerified: true,
          verifyResult: result.result,
          verifiedAt: new Date(),
        },
      });
    } catch {
      counts.unknown++;
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          emailVerified: true,
          verifyResult: 'unknown',
          verifiedAt: new Date(),
        },
      });
    }
    // Rate limit: 100ms between verifications
    await new Promise(r => setTimeout(r, 100));
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
