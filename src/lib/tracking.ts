/**
 * Inject open tracking pixel and wrap links for click tracking.
 * Shared by both the cron job (scheduled sends) and the campaign route (immediate sends).
 */
export function injectTracking(html: string, leadId: string, campaignId?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');

  const params = `lid=${encodeURIComponent(leadId)}${campaignId ? `&cid=${encodeURIComponent(campaignId)}` : ''}`;

  // Inject tracking pixel before </body> or at end
  const pixel = `<img src="${baseUrl}/api/track?t=open&${params}" width="1" height="1" style="display:none" alt="" />`;
  let tracked = html.includes('</body>')
    ? html.replace('</body>', `${pixel}</body>`)
    : html + pixel;

  // Wrap links for click tracking (only http/https links, skip unsubscribe/track)
  tracked = tracked.replace(
    /href="(https?:\/\/[^"]+)"/g,
    (match, url) => {
      if (url.includes('/api/unsubscribe') || url.includes('/api/track') || url.includes('/unsubscribe')) return match;
      const trackUrl = `${baseUrl}/api/track?t=click&${params}&url=${encodeURIComponent(url)}`;
      return `href="${trackUrl}"`;
    }
  );

  return tracked;
}
