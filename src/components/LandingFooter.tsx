import Link from 'next/link';
import { useTranslations } from 'next-intl';

/**
 * Minimal legal footer for ad landing pages. Google and Meta reviewers
 * expect visible business identity + policy links on the destination page;
 * the pages stay conversion-focused (no nav) but never look anonymous.
 */
export function LandingFooter() {
  const t = useTranslations('ui');
  return (
    <footer className="mt-16 pt-8 border-t border-white/[0.06] text-center">
      <p className="text-xs text-gray-600 mb-3">
        Blok Blok Studio &middot; Berlin, Germany &middot;{' '}
        <a href="/contact" className="hover:text-gray-400 transition-colors">
          {t('footer_contact')}
        </a>
      </p>
      <p className="text-xs text-gray-600">
        <Link href="/privacy" className="hover:text-gray-400 transition-colors">{t('footer_privacy')}</Link>
        <span className="mx-2">&middot;</span>
        <Link href="/terms" className="hover:text-gray-400 transition-colors">{t('footer_terms')}</Link>
        <span className="mx-2">&middot;</span>
        <Link href="/cookies" className="hover:text-gray-400 transition-colors">{t('footer_cookies')}</Link>
        <span className="mx-2">&middot;</span>
        <Link href="/impressum" className="hover:text-gray-400 transition-colors">{t('footer_impressum')}</Link>
      </p>
      <p className="text-[11px] text-gray-700 mt-3">
        &copy; {new Date().getFullYear()} Blok Blok Studio. All rights reserved.
      </p>
    </footer>
  );
}
