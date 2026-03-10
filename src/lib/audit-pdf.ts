import { Resend } from 'resend';

const DISCOVERY_URL = 'https://cal.com/chasehaynes/discovery';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Generate the audit PDF by calling the internal Python serverless function.
 * Returns the PDF as a Buffer.
 */
export async function generateAuditPdf(lead: {
  name: string;
  email: string;
  field: string;
  website: string | null;
  problem: string;
}): Promise<Buffer> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  const res = await fetch(`${baseUrl}/api/generate-audit-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      field: lead.field,
      website: lead.website || '',
      problem: lead.problem,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PDF generation failed (${res.status}): ${errText}`);
  }

  const { pdf } = await res.json();
  return Buffer.from(pdf, 'base64');
}

/**
 * Send the audit PDF to the prospect with booking CTAs.
 */
export async function sendAuditPdfToProspect(
  lead: { name: string; email: string; field: string },
  pdfBuffer: Buffer
): Promise<boolean> {
  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const replyTo = process.env.NOTIFICATION_EMAIL || from;
  const firstName = lead.name.split(' ')[0];

  try {
    const { error } = await getResend().emails.send({
      from: `Blok Blok Studio <${from}>`,
      to: lead.email,
      replyTo,
      subject: `${firstName}, your free business audit is ready`,
      html: `
<div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #000; color: #ccc;">
  <div style="border-bottom: 2px solid #00ff88; padding-bottom: 16px; margin-bottom: 24px;">
    <h1 style="color: #fff; font-size: 22px; margin: 0;">Your Free Business Audit</h1>
    <p style="color: #999; margin: 8px 0 0;">Prepared for ${lead.name} &mdash; ${lead.field}</p>
  </div>

  <p style="line-height: 1.6;">Hey ${firstName},</p>

  <p style="line-height: 1.6;">Thanks for requesting an audit from Blok Blok Studio. I've attached your personalized strategy document &mdash; it covers where you are now, the opportunities I see, and a phased roadmap to get you there.</p>

  <p style="line-height: 1.6;">Take a look and let me know what stands out. If you want to talk through any of it, grab a free discovery call:</p>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${DISCOVERY_URL}" style="display: inline-block; background: #00ff88; color: #000; font-weight: bold; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 14px;">BOOK YOUR FREE DISCOVERY CALL</a>
  </div>

  <p style="line-height: 1.6;">Talk soon,<br><strong style="color: #fff;">Chase Haynes</strong><br>Blok Blok Studio</p>

  <div style="border-top: 1px solid #333; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #666; text-align: center;">
    <a href="https://blokblokstudio.com" style="color: #00ff88;">blokblokstudio.com</a> &nbsp;|&nbsp;
    <a href="https://instagram.com/haynes2va" style="color: #999;">@haynes2va</a> &nbsp;|&nbsp;
    <a href="${DISCOVERY_URL}" style="color: #999;">Book a call</a>
  </div>
</div>
      `,
      text: `Hey ${firstName},\n\nThanks for requesting an audit from Blok Blok Studio. I've attached your personalized strategy document — it covers where you are now, the opportunities I see, and a phased roadmap to get you there.\n\nTake a look and let me know what stands out. Book a free discovery call here:\n${DISCOVERY_URL}\n\nTalk soon,\nChase Haynes\nBlok Blok Studio\nblokblokstudio.com`,
      attachments: [
        {
          filename: `${lead.name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\\s+/g, '-')}-Audit-BlokBlokStudio.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('[AuditPDF] Email send error:', error);
      return false;
    }
    console.log(`[AuditPDF] Sent audit PDF to ${lead.email}`);
    return true;
  } catch (err) {
    console.error('[AuditPDF] Exception sending PDF email:', err);
    return false;
  }
}
