/* ==========================================================================
 * LanguageSwitcher.tsx — dropdown menu for manually choosing the site language.
 * ==========================================================================
 *
 * BEHAVIOR:
 *   - Shows the current locale's native name + a small chevron.
 *   - Click to open a panel listing every supported language.
 *   - Selecting one calls the `setLocale` server action, which writes a
 *     long-lived NEXT_LOCALE cookie and revalidates the layout.
 *   - `router.refresh()` pulls in the new translations without a full reload.
 *   - Click-outside / Escape closes the panel.
 *
 * USED BY:
 *   /src/components/Navbar.tsx (desktop CTA cluster + mobile menu overlay)
 *
 * THE AUTO-DETECTION (Accept-Language) still runs on first visit; this
 * dropdown only takes over once the user makes a manual choice.
 * ========================================================================== */

'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { setLocale } from '@/app/actions/locale';
import { localeLabels, supportedLocales, type SupportedLocale } from '@/i18n/locales';
import { useTranslations } from 'next-intl';

type Props = {
  /** "compact" (icon-only chevron) for desktop nav, "wide" for mobile overlay. */
  variant?: 'compact' | 'wide';
};

export function LanguageSwitcher({ variant = 'compact' }: Props) {
  const t = useTranslations('ui');
  const currentLocale = useLocale() as SupportedLocale;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on click outside.
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const handleSelect = (locale: SupportedLocale) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }
    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
      setIsOpen(false);
    });
  };

  const current = localeLabels[currentLocale] ?? localeLabels.en;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('select_language')}
        className={`
          flex items-center gap-2 rounded-full border border-white/10
          bg-white/5 backdrop-blur-md transition-all duration-200
          hover:bg-white/10 hover:border-white/20
          disabled:opacity-50
          ${variant === 'wide'
            ? 'px-5 py-3 text-base text-white'
            : 'px-3 py-1.5 text-xs text-gray-300 hover:text-white'}
        `}
      >
        <GlobeIcon className={variant === 'wide' ? 'w-5 h-5' : 'w-3.5 h-3.5'} />
        <span className="tracking-wide">{current.nativeName}</span>
        <ChevronIcon
          className={`${variant === 'wide' ? 'w-4 h-4' : 'w-3 h-3'} transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`
              absolute z-50 mt-2 max-h-80 overflow-y-auto
              rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl
              shadow-2xl shadow-black/50
              ${variant === 'wide' ? 'left-1/2 -translate-x-1/2 w-64' : 'right-0 w-56'}
            `}
          >
            {supportedLocales.map((code) => {
              const label = localeLabels[code];
              const active = code === currentLocale;
              const isRtl = code === 'ar';
              return (
                <li key={code}>
                  {/* lang + dir attrs let screen readers switch pronunciation
                      and bidi rendering for each locale's native name. */}
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    aria-current={active ? 'true' : undefined}
                    lang={code}
                    dir={isRtl ? 'rtl' : 'ltr'}
                    onClick={() => handleSelect(code)}
                    className={`
                      w-full flex items-center justify-between px-4 py-2.5 text-sm text-left
                      transition-colors duration-150
                      ${active ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    <span className="tracking-wide">{label.nativeName}</span>
                    <span className="text-[10px] uppercase text-gray-400 ml-3">{label.code}</span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20" />
      <path d="M12 2a15.3 15.3 0 0 0 0 20" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
