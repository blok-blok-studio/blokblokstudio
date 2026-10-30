import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * V2Footer — the "Let's talk" block is the site's closing CTA, followed by
 * the full link set so nothing from the old footer is lost.
 */
const BOOKING_URL = 'https://calendar.app.google/oAcFYPRKYB9b4J1c7';
const WHATSAPP_URL = 'https://wa.me/491627055848';

export async function V2Footer() {
  const t = await getTranslations('home');
  const nav = await getTranslations('nav');

  const pages = [
    { href: '/projects', label: nav('projects') },
    { href: '/about', label: nav('about') },
    { href: '/services', label: nav('services') },
    { href: '/pricing', label: nav('pricing') },
    { href: '/blog', label: nav('blog') },
    { href: '/faq', label: nav('faq') },
    { href: '/team', label: nav('team') },
    { href: '/contact', label: nav('contact') },
  ];
  const legal = [
    { href: '/privacy', label: nav('privacy') },
    { href: '/terms', label: nav('terms') },
    { href: '/cookies', label: nav('cookies') },
    { href: '/impressum', label: nav('impressum') },
    { href: '/data-rights', label: nav('data_rights') },
    { href: '/accessibility', label: nav('accessibility') },
  ];
  const social = [
    { href: 'https://www.instagram.com/blokblokstudio/', label: 'Instagram' },
    { href: 'https://www.linkedin.com/company/blok-blok-studio/', label: 'LinkedIn' },
  ];
  const contacts = [
    { href: '/quiz', label: t('v2_quiz_link'), external: false },
    { href: '/contact', label: t('v2_email'), external: false },
    { href: WHATSAPP_URL, label: t('v2_whatsapp'), external: true },
    { href: BOOKING_URL, label: t('v2_book'), external: true },
  ];

  const colHead = 'mb-5 text-[11px] uppercase tracking-[0.2em] text-gray-500';
  const colLink = 'text-sm text-gray-300 transition-colors hover:text-white';

  return (
    <footer className="border-t border-white/10 bg-black px-5 pt-24 pb-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-end">
          <div>
            <h2 className="font-display text-[3.5rem] font-bold leading-[0.9] tracking-[-0.03em] text-white sm:text-[6rem] lg:text-[9rem]">
              {t('v2_talk')}
            </h2>
            <p className="mt-6 max-w-md text-base text-gray-400">{t('v2_talk_sub')}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Chase Haynes · {t('v2_founder')}
            </p>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {contacts.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between py-4 text-lg text-white"
                  >
                    {c.label}
                    <span
                      aria-hidden="true"
                      className="text-orange-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className={colHead}>{t('v2_loc_label')}</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Berlin</li>
              <li>Virginia</li>
              <li>Los Angeles</li>
            </ul>
          </div>
          <div>
            <p className={colHead}>{t('v2_pages_label')}</p>
            <ul className="space-y-2">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={colHead}>{t('v2_legal_label')}</p>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={colLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={colHead}>{t('v2_social_label')}</p>
            <ul className="space-y-2">
              {social.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={colLink}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.18em] text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Blok Blok Studio. {t('v2_rights')}</span>
          <span>[creative tech studio]</span>
        </div>
      </div>
    </footer>
  );
}
