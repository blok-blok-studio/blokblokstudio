'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  const links = [
    { href: '/', label: nav('home') },
    { href: '/projects', label: nav('projects') },
    { href: '/about', label: nav('about') },
    { href: '/services', label: nav('services') },
    { href: '/team', label: nav('team') },
    { href: '/contact', label: nav('contact') },
  ];

  const socials = [
    { label: 'Twitter / X', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Dribbble', href: '#' },
  ];

  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-tight">
                BLOK BLOK
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-gray-400">
                STUDIO
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium mb-6 text-gray-300">
              {t('quick_links')}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-medium mb-6 text-gray-300">
              {t('connect')}
            </h4>
            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-medium mb-6 text-gray-300">
              {t('newsletter_title')}
            </h4>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t('newsletter_placeholder')}
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {t('newsletter_button')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Blok Blok Studio.{' '}
            {t('copyright')}
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -2 }}
            className="text-xs text-gray-600 hover:text-white transition-colors"
          >
            Back to top &uarr;
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
