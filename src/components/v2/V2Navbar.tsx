'use client';

/**
 * V2Navbar — redesign/v2.
 * Minimal fixed bar: mark left, six links, language, one accent pill.
 * Transparent over the hero, backs onto black once the page scrolls.
 * Mobile: a full-screen menu with oversized links.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function V2Navbar() {
  const t = useTranslations('nav');
  const th = useTranslations('home');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const links = [
    { href: '/projects', label: t('v2_work') },
    { href: '/about', label: t('about') },
    { href: '/team', label: t('team') },
    { href: '/blog', label: t('v2_ideas') },
    { href: '/services', label: t('services') },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? 'bg-black/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12"
        >
          <Link href="/" aria-label="Blok Blok Studio" className="flex items-center">
            <Image src="/logo.svg" alt="" width={28} height={28} priority />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm transition-colors hover:text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.9)] ${
                    isActive(l.href) ? 'text-white' : 'text-gray-200'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Link
              href="/quiz" target="_blank" rel="noopener noreferrer"
              className="hidden rounded-full bg-orange-500 px-5 py-2.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400 md:inline-flex"
            >
              {t('v2_cta')}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? th('v2_close_menu') : th('v2_open_menu')}
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span
                className={`absolute block h-px w-6 bg-white transition-transform duration-300 ${
                  open ? 'rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute block h-px w-6 bg-white transition-transform duration-300 ${
                  open ? '-rotate-45' : 'translate-y-1.5'
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-black px-4 pb-10 pt-24 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {links.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex items-baseline gap-4 py-2 font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-5xl"
              >
                <span className="text-xs text-gray-500">0{i + 1}</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <LanguageSwitcher />
          <Link
            href="/quiz" target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-orange-500 px-6 py-3 text-sm text-(--bb-on-primary)"
          >
            {t('v2_cta')}
          </Link>
        </div>
      </div>
    </>
  );
}
