import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-6">
      <div className="text-center max-w-lg">
        {/* Large 404 number with gradient */}
        <h1 className="text-[8rem] sm:text-[10rem] font-bold leading-none bg-gradient-to-b from-white to-gray-700 bg-clip-text text-transparent select-none">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 -mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
