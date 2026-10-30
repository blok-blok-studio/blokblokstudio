import { getTranslations } from 'next-intl/server';
import { V2Navbar } from '@/components/v2/V2Navbar';
import { V2Footer } from '@/components/v2/V2Footer';
import { ChatButtons } from '@/components/ChatButtons';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('a11y');
  return (
    <>
      {/* Skip link: visually hidden until keyboard-focused. Lets screen-reader
          and keyboard users bypass the navbar on every page. WCAG 2.4.1. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-black focus:text-sm focus:font-medium focus:shadow-lg"
      >
        {t('skip_to_main')}
      </a>
      <V2Navbar />
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        {children}
      </main>
      <V2Footer />
      <ChatButtons />
    </>
  );
}
