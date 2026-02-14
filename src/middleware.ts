import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * SOC 2 Compliant Security Middleware
 * Applies security headers to every response for compliance with:
 * - SOC 2 Type II (Security, Availability, Confidentiality)
 * - OWASP Security Headers Best Practices
 * - Google Lighthouse Security Audit
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // ── Content Security Policy (CSP) ──
  // Prevents XSS attacks, code injection, and unauthorized resource loading
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://api.vercel.com",
    "frame-src 'self' https://calendly.com https://cal.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  // ── SOC 2 Required Security Headers ──
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
  );
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  // ── Cross-Origin Isolation Headers ──
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  // ── Cache Control for sensitive routes ──
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  // ── Rate limit header (informational) ──
  if (pathname.startsWith('/api/contact') || pathname.startsWith('/api/newsletter')) {
    response.headers.set('X-RateLimit-Policy', 'Blok Blok Studio API Rate Limiting Active');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, logo.svg, manifest.json (static assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|logo-hero.png|manifest.json|images/).*)',
  ],
};
