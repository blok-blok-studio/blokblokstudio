import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('errors');
  return {
    title: t('not_found_title'),
    description: t('not_found_message'),
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const t = await getTranslations('errors');

  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-6">
      <div className="text-center max-w-lg">
        {/* Large 404 number with gradient */}
        <h1 className="text-[8rem] sm:text-[10rem] font-bold leading-none bg-gradient-to-b from-white to-gray-700 bg-clip-text text-transparent select-none">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 -mt-4">
          {t('not_found_title')}
        </h2>

        <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
          {t('not_found_message')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            {t('back_home')}
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors"
          >
            {t('contact_us')}
          </Link>
        </div>
      </div>
    </div>
  );
}
