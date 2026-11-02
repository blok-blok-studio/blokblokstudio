'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { V2PageHero } from './v2/V2PageHero';

/**
 * PricingContent — package cards in the redesign system. All copy lives in
 * the message files under pricing.pkg (every locale); this file only lays
 * it out. Tabs group one-time work with the matching monthly retainer.
 */
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

const LABEL = 'text-[11px] uppercase tracking-[0.2em] text-gray-500';

export function PricingContent() {
  const t = useTranslations('pricing');
  const pkgData = t.raw('pkg') as Record<string, Package[]>;
  const [tab, setTab] = useState('web');
  // Expanded-card id is "<dataKey>-<index>" so cards across the two
  // sub-sections (one-time + monthly) don't collide.
  const [exp, setExp] = useState<string | null>(null);

  // Live offer is websites and hosting only. The other package groups stay
  // in the message files (app, social, marketing, AI, SaaS, branding) but are
  // not rendered.
  const tabs: { k: string; l: string; sections: { dataKey: string; label: string }[] }[] = [
    { k: 'web', l: t('tabs.web'), sections: [{ dataKey: 'oneTime', label: t('sections.oneTime') }, { dataKey: 'webSupport', label: t('sections.webSupport') }] },
  ];
  const activeTab = tabs.find((x) => x.k === tab) ?? tabs[0];

  return (
    <>
      <V2PageHero label={t('packages')} title={`${t('hero_title_a')} ${t('hero_title_em')}`} intro={t('hero_sub')} />

      <section className="px-5 pb-32 sm:px-8 lg:px-12 lg:pb-44">
        <div className="mx-auto max-w-[1600px]">
          <div className={`mb-12 flex flex-wrap gap-2 border-b border-white/10 pb-5 ${tabs.length < 2 ? 'hidden' : ''}`}>
            {tabs.map((x) => (
              <button
                key={x.k}
                type="button"
                onClick={() => {
                  setTab(x.k);
                  setExp(null);
                }}
                aria-pressed={tab === x.k}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  tab === x.k ? 'border-orange-500 bg-orange-500 text-(--bb-on-primary)' : 'border-white/15 text-gray-300 hover:border-white/40 hover:text-white'
                }`}
              >
                {x.l}
              </button>
            ))}
          </div>

          {activeTab.sections.map((section) => (
            <div key={section.dataKey} className="mb-16 last:mb-0">
              <div className={`mb-8 flex items-baseline justify-between gap-4 border-b border-white/10 pb-4 ${LABEL}`}>
                <h2 className="font-display text-lg font-semibold normal-case tracking-tight text-white">{section.label}</h2>
                <span>{t('v2_options', { count: pkgData[section.dataKey].length })}</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {pkgData[section.dataKey].map((pk, i) => {
                  const cardId = `${section.dataKey}-${i}`;
                  const isE = exp === cardId;
                  return (
                    <article
                      key={cardId}
                      className={`relative flex flex-col rounded-3xl border p-7 sm:p-8 ${pk.pop ? 'border-orange-500' : 'border-white/10'}`}
                    >
                      {pk.pop && (
                        <span className="absolute -top-3 left-7 rounded-full bg-orange-500 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-(--bb-on-primary)">
                          {t('popular')}
                        </span>
                      )}
                      <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500">{pk.tag}</p>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">{pk.name}</h3>

                      <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
                        {pk.scope.map((s, j) => (
                          <li key={j} className="flex gap-3 text-sm leading-relaxed">
                            <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                            <span>
                              <span className="text-white">{s.i}</span>
                              <span className="block text-gray-400">{s.l}</span>
                            </span>
                          </li>
                        ))}
                      </ul>

                      {pk.ex && (
                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={() => setExp(isE ? null : cardId)}
                            aria-expanded={isE}
                            className="text-[11px] uppercase tracking-[0.18em] text-gray-400 transition-colors hover:text-white"
                          >
                            {isE ? t('hide') : t('view')} · {t('not_included')}
                          </button>
                          {isE && (
                            <div className="mt-3 rounded-2xl border border-white/10 p-4">
                              <p className={LABEL}>{t('exclusions')}</p>
                              <p className="mt-2 text-sm leading-relaxed text-gray-400">{pk.ex}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <dl className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
                        {pk.tl && (
                          <div className="flex justify-between gap-4">
                            <dt className="text-gray-500">{t('timeline')}</dt>
                            <dd className="text-right text-gray-300">{pk.tl}</dd>
                          </div>
                        )}
                        {pk.com && (
                          <div className="flex justify-between gap-4">
                            <dt className="text-gray-500">{t('commitment')}</dt>
                            <dd className="text-right text-gray-300">{pk.com}</dd>
                          </div>
                        )}
                        <div className="flex justify-between gap-4">
                          <dt className="text-gray-500">{t('ideal_for')}</dt>
                          <dd className="max-w-[60%] text-right text-gray-300">{pk.ideal}</dd>
                        </div>
                      </dl>

                      <Link
                        href="/contact"
                        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-colors ${
                          pk.pop ? 'bg-orange-500 text-(--bb-on-primary) hover:bg-orange-400' : 'border border-white/15 text-white hover:bg-white/5'
                        }`}
                      >
                        {t('v2_card_cta')} <span aria-hidden="true">→</span>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 p-8 sm:p-12">
            <div>
              <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{t('custom_quote')}</p>
              <p className="mt-2 max-w-lg text-sm text-gray-400">{t('cta_sub')}</p>
            </div>
            <Link
              href="/start?s=web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400"
            >
              {t('cta_button')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
