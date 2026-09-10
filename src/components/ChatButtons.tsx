'use client';

/**
 * Floating chat buttons, fixed bottom-right on all main-site pages
 * (mounted in (main)/layout.tsx; funnel pages stay single-exit).
 *
 * - WeChat: WeChat has no public web deep link that starts a chat, so the
 *   button opens a small card showing the studio's WeChat ID with a copy
 *   action. The button only renders once WECHAT_ID is set below.
 *
 * There is deliberately no WhatsApp button here: a viral post flooded the
 * number with DMs (2026-09-10). WhatsApp now appears only after a visitor
 * submits the form (thanks page, lead email) and on 1:1 pitch pages.
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// Set to the studio's WeChat ID to enable the WeChat button. This must be the
// custom WeChat ID, never the system-assigned `wxid_...` one: that is an
// internal handle nobody can search for, so the copy button would hand
// visitors a string that finds nothing.
const WECHAT_ID = 'chasehaynes';

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
    </div>
  );
}
