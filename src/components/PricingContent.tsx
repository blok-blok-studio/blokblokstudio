'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

/* ──────────────────────────────────────────────────────────────
 * Color tokens (inline, matches the brand orange system)
 * ────────────────────────────────────────────────────────────── */
const O = '#F97316';
const OL = '#FB923C';
const OD = '#EA580C';
const OG = 'rgba(249,115,22,0.15)';
const OF = 'rgba(249,115,22,0.06)';
const GL = '#FBBF24';
const PR = '#34D399';
const MU = '#8888A0';
const FA = '#555568';
const BO = 'rgba(255,255,255,0.06)';

/* ──────────────────────────────────────────────────────────────
 * Package data, every tier, category & line‑item
 * ────────────────────────────────────────────────────────────── */
// Package copy lives in the message files under pricing.pkg (all locales).

/* ──────────────────────────────────────────────────────────────
 * Tiny SVG helpers
 * ────────────────────────────────────────────────────────────── */
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2, color: O }}>
    <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.1" />
    <path d="M5 8.5L7 10.5L11 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chev = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ──────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────── */
interface ScopeItem {
  i: string;
  l: string;
}
interface Package {
  name: string;
  price: number;
  disp: string;
  tag: string;
  pop?: boolean;
  per?: string;
  tl?: string;
  com?: string;
  scope: ScopeItem[];
  ov: string[];
  ho?: string;
  ex?: string;
  bridge?: string;
  ideal: string;
}

/* ──────────────────────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────────────────────── */
export function PricingContent() {
  const t = useTranslations('pricing');
  const pkgData = t.raw('pkg') as Record<string, Package[]>;
  const [tab, setTab] = useState('web');
  // Expanded-card id is now "<dataKey>-<index>" so cards across the two
  // sub-sections (one-time + monthly) don't collide.
  const [exp, setExp] = useState<string | null>(null);

  // Each tab combines a one-time section and a monthly section so visitors
  // see both options for the same discipline side-by-side.
  const tabs: { k: string; l: string; sections: { dataKey: string; label: string }[] }[] = [
    {
      k: 'web', l: t('tabs.web'),
      sections: [
        { dataKey: 'oneTime', label: t('sections.oneTime') },
        { dataKey: 'webSupport', label: t('sections.webSupport') },
      ],
    },
    {
      k: 'app', l: t('tabs.app'),
      sections: [
        { dataKey: 'appBuild', label: t('sections.appBuild') },
        { dataKey: 'appSupport', label: t('sections.appSupport') },
      ],
    },
    {
      k: 'social', l: t('tabs.social'),
      sections: [
        { dataKey: 'socialSetup', label: t('sections.socialSetup') },
        { dataKey: 'social', label: t('sections.social') },
      ],
    },
    {
      k: 'marketing', l: t('tabs.marketing'),
      sections: [
        { dataKey: 'marketingBuild', label: t('sections.marketingBuild') },
        { dataKey: 'monthly', label: t('sections.monthly') },
      ],
    },
    {
      k: 'aiAgents', l: t('tabs.aiAgents'),
      sections: [
        { dataKey: 'aiAgents', label: t('sections.aiAgents') },
        { dataKey: 'monthlyAgent', label: t('sections.monthlyAgent') },
      ],
    },
    {
      k: 'saas', l: t('tabs.saas'),
      sections: [
        { dataKey: 'customBuild', label: t('sections.customBuild') },
        { dataKey: 'customSupport', label: t('sections.customSupport') },
      ],
    },
    {
      k: 'branding', l: t('tabs.branding'),
      sections: [
        { dataKey: 'brandingBuild', label: t('sections.brandingBuild') },
        { dataKey: 'brandingSupport', label: t('sections.brandingSupport') },
      ],
    },
  ];

  const activeTab = tabs.find((t) => t.k === tab) ?? tabs[0];

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', fontFamily: "'Outfit', system-ui, sans-serif", color: '#E4E4ED', padding: '32px 14px', paddingTop: '120px' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: `radial-gradient(ellipse at 25% -5%, ${OG} 0%, transparent 55%)` }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: OF, border: '1px solid rgba(249,115,22,0.18)', borderRadius: 100, padding: '6px 16px', marginBottom: 18, fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: O, textTransform: 'uppercase' }}>
            PACKAGES
          </div>
          <h1 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 'clamp(26px, 4.5vw, 46px)', lineHeight: 1.08, margin: '0 0 12px', letterSpacing: '-1px', background: 'linear-gradient(135deg, #fff, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('hero_title_a')}{' '}
            <span style={{ background: `linear-gradient(135deg, ${O}, ${GL})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('hero_title_em')}</span>
          </h1>
          <p style={{ fontSize: 14, color: MU, maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.6, fontWeight: 300 }}>{t('hero_sub')}</p>
          {/* Tabs, 2-col grid on mobile, inline-flex row on desktop */}
          <style dangerouslySetInnerHTML={{ __html: `
            .pricing-tabs-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:4px;background:rgba(255,255,255,0.03);border:1px solid ${BO};border-radius:12px;padding:3px}
            @media(min-width:700px){.pricing-tabs-grid{display:inline-flex}}
          ` }} />
          <div className="pricing-tabs-grid">
            {tabs.map((t) => (
              <button
                key={t.k}
                onClick={() => { setTab(t.k); setExp(null); }}
                style={{
                  padding: '9px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.3s',
                  background: tab === t.k ? `linear-gradient(135deg, ${O}, ${OD})` : 'transparent',
                  color: tab === t.k ? '#fff' : FA,
                }}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        {/* Cards, two sub-sections per tab: one-time, then monthly */}
        {activeTab.sections.map((section) => (
          <div key={section.dataKey} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <h2 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 18, margin: 0, color: '#E4E4ED', letterSpacing: '-0.3px' }}>
                {section.label}
              </h2>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ fontSize: 10, color: FA, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                {pkgData[section.dataKey].length} option{pkgData[section.dataKey].length === 1 ? '' : 's'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(280px, 100%), 1fr))`, gap: 16 }}>
          {pkgData[section.dataKey].map((pk, i) => {
            const cardId = `${section.dataKey}-${i}`;
            const isE = exp === cardId;
            return (
              <div key={cardId} style={{
                background: `linear-gradient(165deg, ${pk.pop ? 'rgba(249,115,22,0.035)' : 'rgba(14,14,22,0.95)'} 0%, rgba(10,10,15,0.98) 100%)`,
                border: pk.pop ? '1.5px solid rgba(249,115,22,0.4)' : `1px solid ${BO}`,
                borderRadius: 16, padding: '24px 20px', display: 'flex', flexDirection: 'column', position: 'relative',
                boxShadow: pk.pop ? `0 6px 32px ${OG}` : '0 2px 10px rgba(0,0,0,0.25)',
              }}>
                {pk.pop && (
                  <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${O}, ${OL})`, color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 14px', borderRadius: '0 0 8px 8px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    {t('popular')}
                  </div>
                )}
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: O, marginBottom: 6, opacity: 0.65 }}>{pk.tag}</span>
                <h2 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 22, margin: '0 0 12px' }}>{pk.name}</h2>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: 12 }} />

                {/* Scope */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {pk.scope.map((s, j) => (
                    <div key={j} style={{ display: 'flex', gap: 7 }}>
                      <Check />
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#c8c8d8' }}>{s.i}</span>
                        <span style={{ fontSize: 11, color: MU, fontWeight: 300, display: 'block', marginTop: 1, lineHeight: 1.45 }}>{s.l}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expand, exclusions only (no pricing/overage details) */}
                {pk.ex && (
                  <>
                    <button onClick={() => setExp(isE ? null : cardId)} style={{ marginTop: 14, width: '100%', padding: '8px', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontWeight: 600, fontFamily: 'inherit', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: MU, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Chev open={isE} /> {isE ? t('hide') : t('view')} {t('not_included')}
                    </button>
                    {isE && (
                      <div style={{ marginTop: 10, background: OF, border: '1px solid rgba(249,115,22,0.1)', borderRadius: 10, padding: '12px 14px' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: O, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{t('exclusions')}</div>
                        <div style={{ fontSize: 11, color: MU, lineHeight: 1.6 }}>{pk.ex}</div>
                      </div>
                    )}
                  </>
                )}

                {/* Meta */}
                <div style={{ marginTop: 14, padding: '10px 0 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                  {pk.tl && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: FA }}>{t('timeline')}</span>
                      <span style={{ fontSize: 11, color: MU, fontWeight: 600 }}>{pk.tl}</span>
                    </div>
                  )}
                  {pk.com && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: FA }}>{t('commitment')}</span>
                      <span style={{ fontSize: 11, color: MU, fontWeight: 600 }}>{pk.com}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: FA }}>{t('ideal_for')}</span>
                    <span style={{ fontSize: 10, color: '#666', textAlign: 'right', maxWidth: '62%' }}>{pk.ideal}</span>
                  </div>
                </div>

                <a href="/contact" style={{ marginTop: 14, width: '100%', padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, fontFamily: 'inherit', background: pk.pop ? `linear-gradient(135deg, ${O}, ${OD})` : 'rgba(255,255,255,0.04)', color: pk.pop ? '#fff' : '#aaa', boxShadow: pk.pop ? `0 4px 18px ${OG}` : 'none', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                  Get a Custom Quote {'\u2192'}
                </a>
              </div>
            );
          })}
            </div>
          </div>
        ))}

        {/* Final CTA */}
        <div style={{ marginTop: 32, padding: '28px 22px', borderRadius: 16, background: `linear-gradient(135deg, rgba(249,115,22,0.06), rgba(251,191,36,0.04))`, border: `1px solid rgba(249,115,22,0.18)`, textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 22, margin: '0 0 8px' }}>{t('custom_quote')}</h3>
          <p style={{ fontSize: 13, color: MU, margin: '0 auto 18px', maxWidth: 460, lineHeight: 1.6 }}>{t('cta_sub')}</p>
          <a href="/start?s=web" style={{ display: 'inline-block', padding: '12px 28px', borderRadius: 10, background: `linear-gradient(135deg, ${O}, ${OD})`, color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: `0 4px 18px ${OG}` }}>
            {t('cta_button')} {'\u2192'}
          </a>
        </div>

        <p style={{ textAlign: 'center', fontSize: 9, color: '#2a2a35', marginTop: 24, fontWeight: 300 }}>
          Blok Blok Studio
        </p>
      </div>
    </div>
  );
}
