'use client';

/**
 * Floating chat buttons, fixed bottom-right on all main-site pages
 * (mounted in (main)/layout.tsx; funnel pages stay single-exit).
 *
 * - WhatsApp: deep-links straight into a chat with the studio number.
 * - WeChat: WeChat has no public web deep link that starts a chat, so the
 *   button opens a small card showing the studio's WeChat ID with a copy
 *   action. The button only renders once WECHAT_ID is set below.
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const WHATSAPP_LINK =
  'https://wa.me/491627055848?text=Hey%20Chase%2C%20I%20found%20you%20through%20blokblokstudio.com.';

// Set to the studio's WeChat ID to enable the WeChat button.
const WECHAT_ID = 'wxid_9bo8w9aatuud12';

export function ChatButtons() {
  const t = useTranslations('ui');
  const [wechatOpen, setWechatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the ID is visible to copy by hand */
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* WeChat card: QR to scan, ID as fallback */}
      {WECHAT_ID && wechatOpen && (
        <div className="rounded-2xl border border-white/10 bg-gray-950 shadow-2xl p-4 w-64">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">WeChat</p>
          {/* QR stays on a white tile so scanners read it on the dark card */}
          <div className="rounded-xl bg-white p-2 mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- static QR, no optimization needed */}
            <img
              src="/images/wechat-qr.png"
              alt={t('wechat_qr_alt')}
              width={600}
              height={800}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-gray-400 mb-3 text-center">{t('wechat_scan')}</p>
          <button
            onClick={copyWechat}
            className="w-full px-3 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-gray-100 transition-colors"
          >
            {copied ? t('wechat_copied') : t('wechat_copy')}
          </button>
        </div>
      )}

      {/* WeChat toggle */}
      {WECHAT_ID && (
        <button
          onClick={() => setWechatOpen((v) => !v)}
          aria-label={wechatOpen ? t('wechat_close') : t('wechat_open')}
          aria-expanded={wechatOpen}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#07C160] flex items-center justify-center shadow-lg shadow-[#07C160]/25 hover:scale-105 transition-transform cursor-pointer"
        >
          {/* WeChat mark: two chat bubbles */}
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9.1 4C5.2 4 2 6.7 2 10c0 1.9 1 3.5 2.6 4.6l-.7 2.2 2.5-1.3c.6.2 1.3.3 2 .4-.1-.4-.2-.9-.2-1.3 0-3.2 3-5.8 6.7-5.8h.5C14.8 6 12.2 4 9.1 4zM6.7 8.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm4.8 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zM22 14.6c0-2.8-2.7-5-6-5s-6 2.2-6 5 2.7 5 6 5c.6 0 1.2-.1 1.8-.2l2.1 1.1-.6-1.9c1.6-.9 2.7-2.4 2.7-4zm-8-1.2c-.4 0-.8-.3-.8-.8 0-.4.3-.8.8-.8.4 0 .8.3.8.8 0 .4-.4.8-.8.8zm4 0c-.4 0-.8-.3-.8-.8 0-.4.3-.8.8-.8.4 0 .8.3.8.8 0 .4-.4.8-.8.8z" />
          </svg>
        </button>
      )}

      {/* WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsapp_aria')}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/25 hover:scale-105 transition-transform"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
