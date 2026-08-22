import { Resend } from 'resend';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Strip HTML tags for plain-text email version (deliverability boost).
 * Exported so SMTP sends can also generate multipart/alternative emails.
 */
export function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<li>/gi, '- ')
    .replace(/<hr[^>]*>/gi, '\n---\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&mdash;/g, '—')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Send yourself a notification email when a new lead comes in.
 */
export async function notifyNewLead(lead: {
  name: string;
  email: string;
  field: string;
  website: string | null;
  problem: string;
}) {
  const to = process.env.NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  if (!to) {
    console.log('[Email] Skipped notification — NOTIFICATION_EMAIL not set');
    return;
  }

  try {
    await getResend().emails.send({
      from: `Blok Blok Funnel <${from}>`,
      to,
      subject: `New Lead: ${lead.name} (${lead.field})`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #f97316; margin-bottom: 24px;">New Audit Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><a href="mailto:${lead.email}">${lead.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600;">Industry</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${lead.field}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600;">Website</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${lead.website || '<em>No website yet</em>'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; vertical-align: top;">Audit Details</td>
              <td style="padding: 12px 0; white-space: pre-line;">${lead.problem}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #666; font-size: 14px;">
            Reply directly to this lead: <a href="mailto:${lead.email}">${lead.email}</a>
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('[Email] Failed to send notification:', err);
  }
}

/**
 * Send a campaign email to a single lead.
 * Includes deliverability best practices:
 * - Plain text version alongside HTML
 * - Reply-To header
 * - List-Unsubscribe header (one-click)
 * - Proper From name matching domain
 */
export async function sendCampaignEmail({
  to,
  subject,
  html,
  leadId,
}: {
  to: string;
  subject: string;
  html: string;
  leadId: string;
}) {
  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const replyTo = process.env.NOTIFICATION_EMAIL || from;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const unsubscribeUrl = `${baseUrl}/api/unsubscribe?id=${leadId}`;

  const text = htmlToText(html) + `\n\n---\nBlok Blok Studio | Digital Agency for Ambitious Brands\nUnsubscribe: ${unsubscribeUrl}`;

  try {
    const { error } = await getResend().emails.send({
      from: `Blok Blok Studio <${from}>`,
      to,
      replyTo,
      subject,
      html,
      text,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    });

    if (error) {
      console.error(`[Email] Failed to send to ${to}:`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[Email] Exception sending to ${to}:`, err);
    return false;
  }
}

/**
 * Double opt-in confirmation for marketing emails (UWG §7 / GDPR proof).
 * The subscription only becomes active when the recipient clicks the link.
 */
/**
 * Double opt-in confirmation. Returns whether it actually left the building,
 * because a swallowed failure here is invisible in the worst way: the visitor
 * sees success, the lead is saved, and nobody ever learns the confirmation
 * never arrived. Since consent is only lawful once that link is clicked, a
 * silently lost email is a subscriber silently lost.
 *
 * One language, chosen by the caller. It used to send both at once, subject
 * line included, which meant every reader got half an email they could not
 * read.
 */
const CONFIRM_COPY = {
  en: {
    subject: 'Please confirm your subscription',
    heading: 'Please confirm your subscription',
    body: (name: string) =>
      `Hi ${name || 'there'}, you asked to receive growth tips and occasional offers from Blok Blok Studio. Click the button below to confirm. You won't receive marketing emails until you do.`,
    button: 'Confirm subscription',
    ignore: "If you didn't request this, just ignore this email and nothing will be sent.",
    confirmLabel: 'Confirm',
  },
  de: {
    subject: 'Bitte bestätigen Sie Ihre Anmeldung',
    heading: 'Bitte bestätigen Sie Ihre Anmeldung',
    body: (name: string) =>
      `Hallo ${name || 'zusammen'}, Sie möchten Wachstumstipps und gelegentliche Angebote von Blok Blok Studio erhalten. Klicken Sie auf den Button, um dies zu bestätigen. Bis dahin senden wir Ihnen keine Marketing-E-Mails.`,
    button: 'Anmeldung bestätigen',
    ignore: 'Falls Sie das nicht angefordert haben, ignorieren Sie diese E-Mail einfach. Es wird nichts gesendet.',
    confirmLabel: 'Bestätigen',
  },
} as const;

export async function sendMarketingConfirmEmail(
  to: string,
  name: string,
  token: string,
  lang: 'en' | 'de' = 'en'
): Promise<boolean> {
  const t = CONFIRM_COPY[lang];
  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.blokblokstudio.com');
  const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${token}`;

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
      <h2 style="color: #f97316; margin-bottom: 8px;">Blok Blok Studio</h2>
      <h1 style="font-size: 22px; margin: 0 0 16px;">${t.heading}</h1>
      <p style="color: #444; line-height: 1.6;">${t.body(name)}</p>
      <p style="margin: 28px 0;">
        <a href="${confirmUrl}"
           style="background: #111; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 999px; font-weight: 600; display: inline-block;">
          ${t.button}
        </a>
      </p>
      <p style="color: #999; font-size: 12px; line-height: 1.6;">${t.ignore}</p>
      <p style="color: #bbb; font-size: 11px; margin-top: 24px;">
        Blok Blok Studio LLC · blokblokstudio.com
      </p>
    </div>`;

  try {
    const { error } = await getResend().emails.send({
      from: `Blok Blok Studio <${from}>`,
      to,
      subject: t.subject,
      html,
      text: htmlToText(html) + `\n\n${t.confirmLabel}: ${confirmUrl}`,
    });
    if (error) {
      console.error('[Email] Confirm email failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Email] Confirm email error:', err);
    return false;
  }
}

/**
 * Tells us when a confirmation could not be delivered, so the subscriber can
 * be followed up by hand instead of disappearing quietly. Sent to a different
 * address than the one that just failed, so a recipient-specific problem does
 * not take the warning down with it.
 */
export async function notifyConfirmEmailFailed(subscriberEmail: string) {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) return;
  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  try {
    await getResend().emails.send({
      from: `Blok Blok Studio <${from}>`,
      to,
      subject: `Confirmation email failed: ${subscriberEmail}`,
      html: `<p>The double opt-in confirmation to <strong>${subscriberEmail}</strong> did not send.</p>
             <p>They ticked the marketing box, so they are expecting it, but they cannot be emailed
             marketing until they confirm. Worth reaching out by hand.</p>`,
    });
  } catch (err) {
    console.error('[Email] Could not report confirm failure:', err);
  }
}

/**
 * Instant acknowledgment to every new funnel/ad lead. Speed to lead is the
 * single biggest conversion lever: this lands in their inbox seconds after
 * the form, sounds like a person, and hands them the booking link so hot
 * leads can self-schedule before we even call.
 */
export async function sendLeadAckEmail(to: string, name: string) {
  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const replyTo = process.env.NOTIFICATION_EMAIL || from;
  const bookingLink = 'https://calendar.app.google/HeP9bUhWaKfosQF26';
  const whatsapp = 'https://wa.me/491627055848';
  const firstName = (name || '').trim().split(' ')[0] || 'there';

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #222;">
      <p style="line-height: 1.7;">Hey ${firstName},</p>
      <p style="line-height: 1.7;">
        Your request just landed. I'm going to put eyes on your website, your ads, and how
        you follow up with leads, and pull together the three fastest ways to get you more customers.
      </p>
      <p style="line-height: 1.7;">
        The quickest way to get your plan is a 15 minute call. Grab whatever time works:
      </p>
      <p style="margin: 24px 0;">
        <a href="${bookingLink}"
           style="background: #111; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 999px; font-weight: 600; display: inline-block;">
          Pick a time (15 min, free)
        </a>
      </p>
      <p style="line-height: 1.7;">
        Prefer chat? <a href="${whatsapp}" style="color: #111;">Message me on WhatsApp</a> or just reply to this email.
        Either way, you get the plan and it's yours to keep, whether we end up working together or not.
      </p>
      <p style="line-height: 1.7;">Talk soon,<br/>Chase<br/><span style="color: #888;">Blok Blok Studio, Berlin</span></p>
    </div>`;

  try {
    const { error } = await getResend().emails.send({
      from: `Chase at Blok Blok Studio <${from}>`,
      to,
      replyTo,
      subject: `${firstName}, got your request. Here's the fast lane`,
      html,
      text: htmlToText(html),
    });
    if (error) console.error('[Email] Lead ack failed:', error);
  } catch (err) {
    console.error('[Email] Lead ack error:', err);
  }
}
