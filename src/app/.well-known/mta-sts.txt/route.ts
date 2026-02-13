import { NextResponse } from 'next/server';

/**
 * MTA-STS (Mail Transfer Agent Strict Transport Security) — RFC 8461
 *
 * Forces receiving mail servers to use TLS when delivering to your domain.
 * Without this, SMTP connections can be downgraded to plaintext (MITM attacks).
 *
 * Requirements for full MTA-STS:
 * 1. This policy file served at https://mta-sts.blokblokstudio.com/.well-known/mta-sts.txt
 *    (or proxied through the main domain for initial setup)
 * 2. DNS TXT record: _mta-sts.blokblokstudio.com → "v=STSv1; id=20240101"
 *    (increment the id whenever the policy changes)
 * 3. DNS TXT record: _smtp._tls.blokblokstudio.com → "v=TLSRPTv1; rua=mailto:tls-reports@blokblokstudio.com"
 *    (optional but recommended — receives TLS failure reports)
 *
 * Policy modes:
 * - "testing": Soft enforcement — ISPs report failures but still deliver
 * - "enforce": Hard enforcement — ISPs reject plaintext delivery
 * - "none": Disable MTA-STS
 *
 * Start with "testing" mode, then switch to "enforce" after confirming no issues.
 */
export async function GET() {
  const sendingDomain = process.env.SENDING_DOMAIN || 'blokblokstudio.com';
  const mxHost = process.env.MX_HOST || `mail.${sendingDomain}`;
  const mode = process.env.MTA_STS_MODE || 'testing'; // Start with testing, switch to enforce later

  // Policy file format per RFC 8461
  const policy = [
    'version: STSv1',
    `mode: ${mode}`,
    `mx: ${mxHost}`,
    'max_age: 604800', // 7 days (in seconds) — how long receivers cache this policy
  ].join('\n');

  return new NextResponse(policy, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    },
  });
}
