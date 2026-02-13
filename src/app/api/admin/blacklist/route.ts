import { NextRequest, NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/admin-auth';
import { fullBlacklistScan, getBlacklistHistory, checkDnsHealth, getDelistInfo, resolveIPForDomain } from '@/lib/blacklist-monitor';

/**
 * POST /api/admin/blacklist — comprehensive blacklist + DNS health check
 *
 * Enhanced with:
 * - 15+ IP blacklists (was 8)
 * - 4 domain blacklists (was 3)
 * - Severity classifications (critical/high/medium)
 * - Blacklist score (0-100)
 * - DNS health check option
 * - Blacklist history retrieval
 */
export async function POST(req: NextRequest) {
  const authError = checkAdmin(req);
  if (authError) return authError;

  try {
    const { domain, ip: directIp, action } = await req.json();

    // Get blacklist history
    if (action === 'history') {
      const history = await getBlacklistHistory(30);
      return NextResponse.json(history);
    }

    // DNS health check
    if (action === 'dns-health') {
      if (!domain) {
        return NextResponse.json({ error: 'Provide a domain for DNS health check' }, { status: 400 });
      }
      const health = await checkDnsHealth(domain, directIp || undefined);
      return NextResponse.json(health);
    }

    // Standard blacklist check
    if (!domain && !directIp) {
      return NextResponse.json({ error: 'Provide a domain or ip' }, { status: 400 });
    }

    // Resolve actual IP: use direct IP, or resolve domain's mail/A record IP
    let ip = directIp || null;
    if (!ip && domain) {
      ip = await resolveIPForDomain(domain);
    }

    if (!ip) {
      // Domain has no A/MX record — can't check IP blacklists, but still check domain blacklists
      if (domain) {
        const scan = await fullBlacklistScan('127.0.0.2', domain);
        // Only return domain blacklist results (IP results are meaningless with no real IP)
        const domainOnly = scan.domainResults;
        const listedOn = domainOnly
          .filter(r => r.listed)
          .map(r => ({ blacklist: r.blacklist, type: r.severity, delist: getDelistInfo(r.blacklist) }));
        return NextResponse.json({
          domain,
          ip: null,
          clean: listedOn.length === 0,
          score: listedOn.length > 0 ? Math.min(100, listedOn.length * 20) : 0,
          listedCount: listedOn.length,
          listedOn,
          totalChecked: domainOnly.length,
          criticalListings: listedOn.filter(l => l.type === 'critical').map(l => l.blacklist),
          highListings: listedOn.filter(l => l.type === 'high').map(l => l.blacklist),
          ipResults: [],
          domainResults: scan.domainResults,
          checkedAt: new Date().toISOString(),
          warning: `No A/MX record found for ${domain} — only domain blacklists checked (no IP to scan)`,
        });
      }
      return NextResponse.json({ error: 'Could not resolve IP for domain' }, { status: 400 });
    }

    const scan = await fullBlacklistScan(ip, domain || undefined);

    // Build listedOn array from scan results (matches dashboard expected shape)
    const allResults = [...scan.ipResults, ...scan.domainResults];
    const listedOn = allResults
      .filter(r => r.listed)
      .map(r => ({
        blacklist: r.blacklist,
        type: r.severity,
        delist: getDelistInfo(r.blacklist),
      }));
    const totalChecked = allResults.length;

    return NextResponse.json({
      domain: domain || null,
      ip: scan.ip,
      clean: scan.clean,
      score: scan.score,
      listedCount: scan.listedCount,
      listedOn,
      totalChecked,
      criticalListings: scan.criticalListings,
      highListings: scan.highListings,
      ipResults: scan.ipResults,
      domainResults: scan.domainResults,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Blacklist] Check error:', err);
    return NextResponse.json({ error: 'Blacklist check failed' }, { status: 500 });
  }
}
