import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { BOOKING_URL } from '@/data/studio';
import { V2Proof } from './V2Proof';
import { V2Services } from './V2Services';
import { V2NextSteps } from './V2NextSteps';

/**
 * V2CardContent, the landing page behind a team member's business-card QR
 * (first use: Bridget at CES). Someone scanned a card, so the page leads
 * with the person they met, says who the studio is in one breath, and
 * offers the same four actions as the homepage. Copy lives in `card.*`.
 */
export async function V2CardContent() {
  const t = await getTranslations('card');
  const tt = await getTranslations('team');
  const primary = 'inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm text-(--bb-on-primary) transition-colors hover:bg-orange-400';
  const secondary = 'inline-flex items-center rounded-full border border-white/60 px-7 py-3.5 text-sm text-white transition-colors hover:border-white hover:bg-white/10';
  return (
    <>
      <section className="px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-24 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-[auto_1fr]">
          <Image
            src="/images/team/bridget-perdomo.webp"
            alt={t('photo_alt')}
            width={320}
            height={320}
            priority
            className="h-40 w-40 rounded-3xl object-cover sm:h-56 sm:w-56 lg:h-72 lg:w-72"
          />
          <div>
            <p className="t-eyebrow text-gray-500">{t('eyebrow')}</p>
            <h1 className="mt-5 max-w-4xl text-balance t-display text-white">{t('title')}</h1>
            <p className="mt-3 t-h3 text-gray-300">{tt('role_marketing')}</p>
            <p className="mt-6 max-w-2xl t-lead text-gray-400">{t('intro')}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="/vcard/bridget-perdomo.vcf" download className={primary}>
                {t('save_contact')} <span aria-hidden="true">↓</span>
              </a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={secondary}>{t('book')}</a>
              <Link href="/projects" className={secondary}>{t('see_work')}</Link>
              <Link href="/start" className={secondary}>{t('start')}</Link>
            </div>
            <p className="mt-10 t-eyebrow text-gray-500">{t('where_label')}</p>
            <p className="mt-2 max-w-2xl t-caption text-gray-400">{t('where')}</p>
          </div>
        </div>
      </section>
      <V2Proof />
      <V2Services />
      <V2NextSteps />
    </>
  );
}
