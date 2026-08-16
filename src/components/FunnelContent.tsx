'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Turnstile } from './Turnstile';
import { BusinessPicker } from './BusinessPicker';

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({
  children,
  className = '',
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Accent line divider ── */
function AccentDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
    </div>
  );
}

/* ── Data ── */

// Brand names and URLs are proper nouns / addresses — not translated.
const trustedBrands = [
  { name: 'Coach Luki', image: '/images/projects/coachluki.jpg', url: 'coachluki.com', categoryKey: 'category_fitness' },
  { name: 'Coach Kofi', image: '/images/projects/coachkofi.webp', url: 'coachkofi.de', categoryKey: 'category_coaching' },
  { name: 'Nanny & Nest', image: '/images/projects/nannyandnest.webp', url: 'nannyandnest.com', categoryKey: 'category_childcare' },
  { name: 'Exotic Ripz', image: '/images/projects/exoticripz.jpg', url: 'exoticripz.com', categoryKey: 'category_ecommerce' },
  { name: 'KDS Systems', image: '/images/projects/kdssys.webp', url: 'kdssys.com', categoryKey: 'category_it' },
  { name: 'Public Affair', image: '/images/projects/public-affair.webp', url: 'public-affair.com', categoryKey: 'category_lifestyle' },
  { name: 'The New School', image: '/images/projects/military-newschool.webp', url: 'military.newschool.edu', categoryKey: 'category_education' },
];

// Copy lives in the `call` namespace: step_{n}_title / step_{n}_desc / step_{n}_duration
const roadmapStepNums = ['01', '02', '03', '04', '05'];

/* ── SVG Illustrations for roadmap steps ── */
function StepIllustration({ step }: { step: string }) {
  const shared = 'w-full h-full';
  switch (step) {
    case '01':
      // Video call / strategy call illustration
      return (
        <svg className={shared} viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Monitor/Screen */}
          <rect x="40" y="20" width="200" height="130" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
          <rect x="50" y="30" width="180" height="100" rx="6" fill="rgba(249,115,22,0.05)" />
          {/* Person silhouette left */}
          <circle cx="110" cy="65" r="16" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.3)" strokeWidth="1" />
          <rect x="94" y="85" width="32" height="35" rx="6" fill="rgba(249,115,22,0.1)" stroke="rgba(249,115,22,0.2)" strokeWidth="1" />
          {/* Person silhouette right */}
          <circle cx="170" cy="65" r="16" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
          <rect x="154" y="85" width="32" height="35" rx="6" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.2)" strokeWidth="1" />
          {/* Video call indicator */}
          <circle cx="140" cy="45" r="4" fill="rgba(34,197,94,0.6)" />
          {/* Monitor stand */}
          <rect x="120" y="150" width="40" height="8" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="130" y="158" width="20" height="12" rx="2" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* Chat bubbles */}
          <rect x="60" y="35" width="35" height="12" rx="6" fill="rgba(249,115,22,0.2)" />
          <rect x="185" y="50" width="35" height="12" rx="6" fill="rgba(239,68,68,0.2)" />
          {/* Signal waves */}
          <path d="M200 30 Q210 25, 210 35" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" fill="none" />
          <path d="M205 25 Q218 18, 218 38" stroke="rgba(34,197,94,0.2)" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case '02':
      // Strategy / planning / calendar illustration
      return (
        <svg className={shared} viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clipboard */}
          <rect x="70" y="15" width="140" height="170" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
          <rect x="110" y="8" width="60" height="16" rx="8" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.3)" strokeWidth="1" />
          {/* Checklist items */}
          <rect x="90" y="45" width="14" height="14" rx="3" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" />
          <path d="M93 52 L96 55 L101 49" stroke="rgba(34,197,94,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <rect x="112" y="48" width="80" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
          <rect x="90" y="72" width="14" height="14" rx="3" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" />
          <path d="M93 79 L96 82 L101 76" stroke="rgba(34,197,94,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <rect x="112" y="75" width="70" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
          <rect x="90" y="99" width="14" height="14" rx="3" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
          <rect x="112" y="102" width="75" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
          <rect x="90" y="126" width="14" height="14" rx="3" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
          <rect x="112" y="129" width="65" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
          {/* Price tag */}
          <rect x="90" y="155" width="100" height="18" rx="9" fill="rgba(249,115,22,0.1)" stroke="rgba(249,115,22,0.2)" strokeWidth="1" />
          <rect x="100" y="159" width="30" height="10" rx="5" fill="rgba(249,115,22,0.2)" />
          {/* Floating elements */}
          <circle cx="225" cy="40" r="15" fill="rgba(249,115,22,0.05)" stroke="rgba(249,115,22,0.15)" strokeWidth="1" />
          <text x="220" y="45" fill="rgba(249,115,22,0.4)" fontSize="12" fontWeight="bold">$</text>
          <rect x="215" y="70" width="40" height="30" rx="6" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.15)" strokeWidth="1" />
          <rect x="222" y="78" width="26" height="3" rx="1.5" fill="rgba(239,68,68,0.2)" />
          <rect x="222" y="85" width="18" height="3" rx="1.5" fill="rgba(239,68,68,0.15)" />
        </svg>
      );
    case '03':
      // Design / wireframe illustration
      return (
        <svg className={shared} viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Browser window */}
          <rect x="35" y="20" width="210" height="155" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
          {/* Browser chrome */}
          <rect x="35" y="20" width="210" height="28" rx="10" fill="rgba(255,255,255,0.04)" />
          <circle cx="52" cy="34" r="4" fill="rgba(239,68,68,0.4)" />
          <circle cx="64" cy="34" r="4" fill="rgba(234,179,8,0.4)" />
          <circle cx="76" cy="34" r="4" fill="rgba(34,197,94,0.4)" />
          <rect x="95" y="30" width="100" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
          {/* Layout wireframe */}
          <rect x="50" y="58" width="70" height="10" rx="3" fill="rgba(249,115,22,0.2)" />
          <rect x="50" y="75" width="180" height="40" rx="6" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.15)" strokeWidth="1" />
          {/* Grid wireframe blocks */}
          <rect x="50" y="122" width="55" height="40" rx="4" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.15)" strokeWidth="1" />
          <rect x="112" y="122" width="55" height="40" rx="4" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.15)" strokeWidth="1" />
          <rect x="174" y="122" width="55" height="40" rx="4" fill="rgba(234,179,8,0.06)" stroke="rgba(234,179,8,0.15)" strokeWidth="1" />
          {/* Pen tool cursor */}
          <path d="M230 85 L245 100 L240 105 L235 103 Z" fill="rgba(249,115,22,0.4)" stroke="rgba(249,115,22,0.6)" strokeWidth="1" />
          <path d="M235 103 L233 110 L240 105" fill="rgba(249,115,22,0.3)" />
          {/* Color swatches */}
          <circle cx="255" cy="140" r="8" fill="rgba(249,115,22,0.3)" stroke="rgba(249,115,22,0.5)" strokeWidth="1" />
          <circle cx="255" cy="158" r="8" fill="rgba(239,68,68,0.3)" stroke="rgba(239,68,68,0.5)" strokeWidth="1" />
        </svg>
      );
    case '04':
      // Development / code illustration
      return (
        <svg className={shared} viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Laptop base */}
          <rect x="40" y="25" width="200" height="125" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
          <path d="M25 150 L255 150 L245 165 Q240 170, 235 170 L45 170 Q40 170, 35 165 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          {/* Screen */}
          <rect x="50" y="35" width="180" height="105" rx="4" fill="rgba(15,15,25,0.8)" />
          {/* Code lines */}
          <rect x="60" y="45" width="40" height="5" rx="2.5" fill="rgba(239,68,68,0.4)" />
          <rect x="105" y="45" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
          <rect x="72" y="56" width="30" height="5" rx="2.5" fill="rgba(249,115,22,0.4)" />
          <rect x="107" y="56" width="50" height="5" rx="2.5" fill="rgba(34,197,94,0.3)" />
          <rect x="72" y="67" width="45" height="5" rx="2.5" fill="rgba(96,165,250,0.3)" />
          <rect x="122" y="67" width="35" height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
          <rect x="72" y="78" width="55" height="5" rx="2.5" fill="rgba(168,85,247,0.3)" />
          <rect x="132" y="78" width="40" height="5" rx="2.5" fill="rgba(249,115,22,0.25)" />
          <rect x="60" y="89" width="35" height="5" rx="2.5" fill="rgba(239,68,68,0.4)" />
          <rect x="60" y="100" width="50" height="5" rx="2.5" fill="rgba(249,115,22,0.3)" />
          <rect x="115" y="100" width="40" height="5" rx="2.5" fill="rgba(34,197,94,0.25)" />
          <rect x="72" y="111" width="65" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
          <rect x="72" y="122" width="45" height="5" rx="2.5" fill="rgba(96,165,250,0.25)" />
          {/* Terminal cursor */}
          <rect x="60" y="122" width="7" height="5" rx="1" fill="rgba(249,115,22,0.5)">
            <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
          </rect>
          {/* Progress indicator */}
          <rect x="165" y="45" width="55" height="20" rx="4" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.2)" strokeWidth="1" />
          <rect x="170" y="52" width="35" height="6" rx="3" fill="rgba(34,197,94,0.15)" />
          <rect x="170" y="52" width="25" height="6" rx="3" fill="rgba(34,197,94,0.4)" />
        </svg>
      );
    case '05':
      // Launch / rocket illustration
      return (
        <svg className={shared} viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dashboard screen */}
          <rect x="50" y="20" width="180" height="120" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
          {/* Top bar */}
          <rect x="50" y="20" width="180" height="22" rx="10" fill="rgba(255,255,255,0.04)" />
          <circle cx="66" cy="31" r="3.5" fill="rgba(34,197,94,0.5)" />
          <rect x="78" y="28" width="50" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
          {/* Chart going up */}
          <path d="M70 120 L100 105 L130 110 L160 85 L190 70 L210 50" stroke="rgba(249,115,22,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M70 120 L100 105 L130 110 L160 85 L190 70 L210 50 L210 120 L70 120 Z" fill="rgba(249,115,22,0.05)" />
          {/* Data points */}
          <circle cx="100" cy="105" r="3" fill="rgba(249,115,22,0.6)" />
          <circle cx="130" cy="110" r="3" fill="rgba(249,115,22,0.6)" />
          <circle cx="160" cy="85" r="3" fill="rgba(249,115,22,0.6)" />
          <circle cx="190" cy="70" r="3" fill="rgba(249,115,22,0.6)" />
          <circle cx="210" cy="50" r="4" fill="rgba(249,115,22,0.8)" stroke="rgba(249,115,22,0.4)" strokeWidth="4" />
          {/* Rocket */}
          <g transform="translate(200, 30) rotate(30)">
            <path d="M0 -10 Q0 -20, 5 -25 Q10 -20, 10 -10 L10 5 L0 5 Z" fill="rgba(249,115,22,0.4)" stroke="rgba(249,115,22,0.6)" strokeWidth="1" />
            <rect x="2" y="-5" width="6" height="4" rx="1" fill="rgba(96,165,250,0.3)" />
            <path d="M0 5 L-3 10 L0 8 Z" fill="rgba(239,68,68,0.4)" />
            <path d="M10 5 L13 10 L10 8 Z" fill="rgba(239,68,68,0.4)" />
            <path d="M2 8 L5 15 L8 8" fill="rgba(249,115,22,0.3)" />
          </g>
          {/* Support indicators */}
          <rect x="60" y="150" width="160" height="30" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <circle cx="80" cy="165" r="8" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
          <path d="M77 165 L79 167 L83 163" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" fill="none" />
          <rect x="95" y="161" width="60" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="95" y="168" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
          {/* Sparkles */}
          <circle cx="240" cy="45" r="2" fill="rgba(234,179,8,0.4)" />
          <circle cx="250" cy="65" r="1.5" fill="rgba(249,115,22,0.3)" />
          <circle cx="45" cy="55" r="1.5" fill="rgba(249,115,22,0.3)" />
        </svg>
      );
    default:
      return null;
  }
}

// Copy lives in the `call` namespace: benefit_{n}_title / benefit_{n}_desc
const benefitCards = [
  { icon: '🤖', color: 'from-green-500/10 to-emerald-500/5' },
  { icon: '⚡', color: 'from-yellow-500/10 to-amber-500/5' },
  { icon: '🌐', color: 'from-blue-500/10 to-cyan-500/5' },
  { icon: '📈', color: 'from-orange-500/10 to-red-500/5' },
  { icon: '🎬', color: 'from-purple-500/10 to-violet-500/5' },
  { icon: '📊', color: 'from-pink-500/10 to-rose-500/5' },
];

// Copy lives in the `call` namespace: module_{n}_title / module_{n}_item_{m}
const serviceModuleIcons = ['🤖', '🌐', '📈', '📊'];

// Stats ('+200%' etc.) and 'Berlin' are figures / proper nouns — not translated.
// Metric captions live in the `call` namespace: showcase_{n}_metric
const projectShowcase = [
  { label: 'Coach Luki', stat: 'Berlin', image: '/images/projects/coachluki.jpg', url: 'coachluki.com' },
  { label: 'Coach Kofi', stat: '+200%', image: '/images/projects/coachkofi.webp', url: 'coachkofi.de' },
  { label: 'Nanny & Nest', stat: '+150%', image: '/images/projects/nannyandnest.webp', url: 'nannyandnest.com' },
  { label: 'Exotic Ripz', stat: '+400%', image: '/images/projects/exoticripz.jpg', url: 'exoticripz.com' },
  { label: 'KDS Systems', stat: '+180%', image: '/images/projects/kdssys.webp', url: 'kdssys.com' },
  { label: 'Public Affair', stat: '95%+', image: '/images/projects/public-affair.webp', url: 'public-affair.com' },
  { label: 'The New School', stat: '10x', image: '/images/projects/military-newschool.webp', url: 'military.newschool.edu' },
];

// Copy lives in the `call` namespace: included_{n}
const includedIcons = ['👤', '🤖', '⚡', '🔍', '📊', '📝', '🛡️', '📈', '🎨', '🎬'];

// Copy lives in the `call` namespace: whofor_{n}
const idealFor = [
  { yes: true },
  { yes: true },
  { yes: true },
  { yes: true },
  { yes: false },
  { yes: false },
];

/* ── CTA Button ── */
function scrollToCall() {
  const el = document.getElementById('call');
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 20;
  window.scrollTo({ top, behavior: 'smooth' });
}

function CTAButton({ text, className = '', variant = 'primary' }: { text?: string; className?: string; variant?: 'primary' | 'secondary' }) {
  const t = useTranslations('call');
  const label = text ?? t('cta_book_call');
  const base = variant === 'primary'
    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-400 hover:to-red-400 shadow-lg shadow-orange-500/20'
    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10';
  return (
    <motion.button
      onClick={scrollToCall}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-sm sm:text-base transition-all cursor-pointer ${base} ${className}`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {label}
    </motion.button>
  );
}

/* ── BANT Qualifying Form Options ── */
const CAL_LINK = 'https://calendar.app.google/frvo4DLJAJYG2HLWA';

// `label` holds the translation key (call namespace); `crm` is the English
// label embedded in the BANT summary sent to the API — internal CRM text
// that must stay English regardless of the visitor's locale.
const budgetOptions = [
  { value: 'not_ready', label: 'budget_not_ready', crm: "I'm not ready to invest right now" },
  { value: '1k_3k', label: 'budget_1k_3k', crm: '$1,000 - $3,000' },
  { value: '3k_5k', label: 'budget_3k_5k', crm: '$3,000 - $5,000' },
  { value: '5k_10k', label: 'budget_5k_10k', crm: '$5,000 - $10,000' },
  { value: '10k_plus', label: 'budget_10k_plus', crm: '$10,000+' },
];

const authorityOptions = [
  { value: 'sole', label: 'authority_sole', crm: "I'm the sole decision-maker" },
  { value: 'can_bring', label: 'authority_can_bring', crm: 'Others are involved, but I can bring them to the call' },
  { value: 'need_check', label: 'authority_need_check', crm: 'I need to check with my team first' },
];

const needOptions = [
  { value: 'yes_now', label: 'need_yes_now', crm: 'Yes - I have a clear need right now' },
  { value: 'yes_exploring', label: 'need_yes_exploring', crm: "I think so - I'm exploring options" },
  { value: 'no', label: 'need_no', crm: 'Not really - just browsing' },
];

const timingYesNo = [
  { value: 'yes', label: 'timing_yes' },
  { value: 'no', label: 'timing_no' },
];

/* ── BANT Qualifying Form ── */
function RadioOption({ value, label, name, selected, onChange }: { value: string; label: string; name: string; selected: boolean; onChange: () => void }) {
  return (
    <label
      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
        selected
          ? 'bg-orange-500/[0.08] border border-orange-500/30'
          : 'bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
      }`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
        selected ? 'border-orange-500' : 'border-white/20'
      }`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onChange}
        className="sr-only"
      />
      <span className={`text-sm sm:text-base ${selected ? 'text-orange-300' : 'text-gray-300'}`}>{label}</span>
    </label>
  );
}

function AuditForm() {
  const t = useTranslations('call');
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [direction, setDirection] = useState(1);
  const [qualified, setQualified] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const [disqualifyReason, setDisqualifyReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [timingToken] = useState(() => Date.now().toString(36));
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    budget: '',
    authority: '',
    need: '',
    timingImplement: '',
    timingRight: '',
    commitment: '',
    _hp: '',
  });

  const totalSteps = 6;
  const progress = ((step + 1) / totalSteps) * 100;
  const stepLabels = [
    t('step_label_info'),
    t('step_label_investment'),
    t('step_label_decision'),
    t('step_label_goals'),
    t('step_label_timing'),
    t('step_label_confirm'),
  ];

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return formData.name.trim() !== '' && formData.email.trim() !== '' && formData.email.includes('@') && formData.business.trim() !== '' && consent;
      case 1: return formData.budget !== '';
      case 2: return formData.authority !== '';
      case 3: return formData.need !== '';
      case 4: return formData.timingImplement !== '' && formData.timingRight !== '';
      case 5: return formData.commitment !== '';
      default: return false;
    }
  };

  const disqualify = async (reason: string) => {
    setDisqualifyReason(reason);
    setDisqualified(true);
    // Still submit to CRM with [DQ] tag for future outreach
    try {
      // English CRM labels — the BANT summary sent to the API stays English.
      const budgetLabel = budgetOptions.find(o => o.value === formData.budget)?.crm || formData.budget || 'N/A';
      const authorityLabel = authorityOptions.find(o => o.value === formData.authority)?.crm || formData.authority || 'N/A';
      const needLabel = needOptions.find(o => o.value === formData.need)?.crm || formData.need || 'N/A';
      const bantSummary = [
        `DISQUALIFIED LEAD [DQ], ${reason}`,
        '',
        `Business: ${formData.business || 'N/A'}`,
        `Budget: ${budgetLabel}`,
        `Authority: ${authorityLabel}`,
        `Need: ${needLabel}`,
        `Time to implement: ${formData.timingImplement || 'N/A'}`,
        `Right time: ${formData.timingRight || 'N/A'}`,
        `Willing to show up: ${formData.commitment || 'N/A'}`,
      ].join('\n');
      await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          field: 'Strategy Lead [DQ]',
          business: formData.business,
          phone: formData.phone || undefined,
          website: '',
          noWebsite: true,
          problem: bantSummary,
          consent,
          _hp: formData._hp,
          _t: timingToken,
          _cf: turnstileToken,
        }),
      });
    } catch {
      // Silently fail, DQ screen still shows
    }
  };

  const handleNext = async () => {
    if (!canProceed()) return;
    setDirection(1);
    setError('');

    // ── Disqualification checks ──
    // Budget: no budget at all
    if (step === 1 && formData.budget === 'not_ready') {
      await disqualify('no_budget');
      return;
    }
    // Need: just browsing
    if (step === 3 && formData.need === 'no') {
      await disqualify('no_need');
      return;
    }
    // Timing: both questions answered "no"
    if (step === 4 && formData.timingImplement === 'no' && formData.timingRight === 'no') {
      await disqualify('bad_timing');
      return;
    }
    // Commitment: won't show up
    if (step === 5 && formData.commitment === 'no') {
      await disqualify('no_commitment');
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    } else {
      await submitLead();
    }
  };

  const submitLead = async () => {
    setSubmitting(true);
    setError('');

    // English CRM labels — the BANT summary sent to the API stays English.
    const budgetLabel = budgetOptions.find(o => o.value === formData.budget)?.crm || formData.budget;
    const authorityLabel = authorityOptions.find(o => o.value === formData.authority)?.crm || formData.authority;
    const needLabel = needOptions.find(o => o.value === formData.need)?.crm || formData.need;

    // Score lead quality for CRM prioritization
    let score = 0;
    if (formData.budget !== 'not_ready') score++;
    if (formData.budget === '5k_10k' || formData.budget === '10k_plus') score++;
    if (formData.authority === 'sole' || formData.authority === 'can_bring') score++;
    if (formData.need === 'yes_now') score++;
    if (formData.timingImplement === 'yes') score++;
    if (formData.timingRight === 'yes') score++;
    if (formData.commitment === 'yes') score++;
    const tier = score >= 5 ? 'HOT' : score >= 3 ? 'WARM' : 'COLD';

    const bantSummary = [
      `STRATEGY LEAD [${tier}] (score: ${score}/7)`,
      '',
      `Business: ${formData.business}`,
      `Budget: ${budgetLabel}`,
      `Authority: ${authorityLabel}`,
      `Need: ${needLabel}`,
      `Time to implement: ${formData.timingImplement === 'yes' ? 'Yes' : 'No'}`,
      `Right time: ${formData.timingRight === 'yes' ? 'Yes' : 'No'}`,
      `Willing to show up: ${formData.commitment === 'yes' ? 'Yes' : 'No'}`,
    ].join('\n');

    try {
      const res = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          field: `Strategy Lead [${tier}]`,
          business: formData.business,
          phone: formData.phone || undefined,
          website: '',
          noWebsite: true,
          problem: bantSummary,
          consent,
          _hp: formData._hp,
          _t: timingToken,
          _cf: turnstileToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t('error_fallback'));
      }

      setQualified(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error_generic'));
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Completed, Cal.com Booking ── */
  if (qualified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 sm:py-16"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-3">{t('qualified_title')}</h3>
        <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto mb-8">
          {t('qualified_subtitle')}
        </p>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-base shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-red-400 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {t('qualified_button')}
        </a>
        <p className="text-xs text-gray-600 mt-4">{t('qualified_note')}</p>
      </motion.div>
    );
  }

  /* ── Disqualified Screen ── */
  if (disqualified) {
    const dqReasons = ['no_budget', 'no_need', 'bad_timing', 'no_commitment'];
    const dqReason = dqReasons.includes(disqualifyReason) ? disqualifyReason : 'no_budget';
    const dq = {
      heading: t(`dq_${dqReason}_heading`),
      message: t(`dq_${dqReason}_message`),
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 sm:py-16"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-3">{dq.heading}</h3>
        <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto mb-8">
          {dq.message}
        </p>
        <div className="space-y-3 max-w-xs mx-auto">
          <a
            href="https://www.instagram.com/blokblokstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white font-medium text-sm hover:bg-white/[0.1] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            {t('dq_instagram')}
          </a>
          <a
            href="/"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-gray-500 text-sm hover:text-gray-300 transition-colors"
          >
            {t('dq_back_home')}
          </a>
        </div>
        <p className="text-xs text-gray-600 mt-8">{t('dq_note')}</p>
      </motion.div>
    );
  }

  /* ── Form Steps ── */
  const inputBase = 'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/40 focus:bg-white/[0.06] transition-colors';

  return (
    <div className="space-y-6">
      {/* Honeypot */}
      <input type="text" name="_hp" value={formData._hp || ''} onChange={(e) => setFormData({ ...formData, _hp: e.target.value })} autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" />

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{t('form_progress', { current: step + 1, total: totalSteps })}</span>
          <span>{stepLabels[step]}</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step content with animation */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: direction * 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Step 0: Name & Email */}
        {step === 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-1">{t('form_basics_title')}</h4>
            <p className="text-sm text-gray-400 mb-4">{t('form_basics_subtitle')}</p>
            <div>
              <label htmlFor="call-name" className="block text-xs text-gray-400 mb-1.5 ml-1">{t('form_name_label')}</label>
              <input id="call-name" type="text" required placeholder={t('form_name_placeholder')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputBase} />
            </div>
            <div>
              <label htmlFor="call-email" className="block text-xs text-gray-400 mb-1.5 ml-1">{t('form_email_label')}</label>
              <input id="call-email" type="email" required placeholder={t('form_email_placeholder')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputBase} />
            </div>
            <div>
              <label htmlFor="call-phone" className="block text-xs text-gray-400 mb-1.5 ml-1">{t('form_phone_label')} <span className="text-gray-600">{t('form_phone_optional')}</span></label>
              <input id="call-phone" type="tel" placeholder={t('form_phone_placeholder')} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputBase} autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="call-business" className="block text-xs text-gray-400 mb-1.5 ml-1">{t('form_business_label')}</label>
              <BusinessPicker value={formData.business} onChange={(val) => setFormData({ ...formData, business: val })} inputBase={inputBase} />
            </div>
            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-orange-500"
                required
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                {t.rich('consent_label', {
                  link: (chunks) => (
                    <a href="/privacy" target="_blank" className="text-gray-300 underline hover:text-white">
                      {chunks}
                    </a>
                  ),
                })}
              </span>
            </label>
            <Turnstile onToken={onTurnstileToken} theme="dark" className="mt-2" />
          </div>
        )}

        {/* Step 1: Budget */}
        {step === 1 && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold mb-1">{t('form_budget_title')}</h4>
            <p className="text-sm text-gray-400 mb-4">{t('form_budget_subtitle')}</p>
            {budgetOptions.map((opt) => (
              <RadioOption key={opt.value} value={opt.value} label={t(opt.label)} name="budget" selected={formData.budget === opt.value} onChange={() => setFormData({ ...formData, budget: opt.value })} />
            ))}
          </div>
        )}

        {/* Step 2: Authority */}
        {step === 2 && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold mb-1">{t('form_authority_title')}</h4>
            <p className="text-sm text-gray-400 mb-4">{t('form_authority_subtitle')}</p>
            {authorityOptions.map((opt) => (
              <RadioOption key={opt.value} value={opt.value} label={t(opt.label)} name="authority" selected={formData.authority === opt.value} onChange={() => setFormData({ ...formData, authority: opt.value })} />
            ))}
          </div>
        )}

        {/* Step 3: Need */}
        {step === 3 && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold mb-1">{t('form_need_title')}</h4>
            <p className="text-sm text-gray-400 mb-4">{t('form_need_subtitle')}</p>
            {needOptions.map((opt) => (
              <RadioOption key={opt.value} value={opt.value} label={t(opt.label)} name="need" selected={formData.need === opt.value} onChange={() => setFormData({ ...formData, need: opt.value })} />
            ))}
          </div>
        )}

        {/* Step 4: Timing */}
        {step === 4 && (
          <div className="space-y-5">
            <h4 className="text-lg font-semibold mb-1">{t('form_timing_title')}</h4>
            <p className="text-sm text-gray-400 mb-4">{t('form_timing_subtitle')}</p>
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-300">{t('form_timing_q1')}</p>
              {timingYesNo.map((opt) => (
                <RadioOption key={`impl-${opt.value}`} value={opt.value} label={t(opt.label)} name="timingImplement" selected={formData.timingImplement === opt.value} onChange={() => setFormData({ ...formData, timingImplement: opt.value })} />
              ))}
            </div>
            <div className="space-y-3 pt-2">
              <p className="text-sm font-medium text-gray-300">{t('form_timing_q2')}</p>
              {timingYesNo.map((opt) => (
                <RadioOption key={`right-${opt.value}`} value={opt.value} label={t(opt.label)} name="timingRight" selected={formData.timingRight === opt.value} onChange={() => setFormData({ ...formData, timingRight: opt.value })} />
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Commitment */}
        {step === 5 && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold mb-1">{t('form_commit_title')}</h4>
            <p className="text-sm text-gray-400 mb-4">{t('form_commit_subtitle')}</p>
            <RadioOption value="yes" label={t('commit_yes')} name="commitment" selected={formData.commitment === 'yes'} onChange={() => setFormData({ ...formData, commitment: 'yes' })} />
            <RadioOption value="no" label={t('commit_no')} name="commitment" selected={formData.commitment === 'no'} onChange={() => setFormData({ ...formData, commitment: 'no' })} />
          </div>
        )}
      </motion.div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {error}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('button_back')}
          </button>
        )}
        <motion.button
          type="button"
          onClick={handleNext}
          disabled={!canProceed() || submitting}
          whileHover={{ scale: canProceed() && !submitting ? 1.02 : 1 }}
          whileTap={{ scale: canProceed() && !submitting ? 0.98 : 1 }}
          className="flex-1 flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-red-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t('button_submitting')}
            </>
          ) : step === 5 ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t('button_get_link')}
            </>
          ) : (
            <>
              {t('button_continue')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </motion.button>
      </div>

      <p className="text-xs text-gray-600 text-center flex items-center justify-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-green-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {t('form_privacy_note')}
      </p>
    </div>
  );
}

/* ── FAQ Accordion ── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={`border border-white/5 rounded-2xl mb-3 overflow-hidden transition-colors ${open ? 'bg-white/[0.03]' : 'bg-transparent hover:bg-white/[0.02]'}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
      >
        <span className="text-sm sm:text-base font-medium">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-400 leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}



/* ================================================================
 * PITCH VIDEO, Click-to-play video with poster overlay
 * ================================================================ */
function PitchVideo() {
  const t = useTranslations('call');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    // Small delay to ensure the video element is rendered
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, []);

  return (
    <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10">
      {/* Video element (always mounted for preloading poster) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/pitch.mp4"
        poster="/videos/pitch-poster.jpg"
        playsInline
        controls={isPlaying}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Play overlay, hides once playing */}
      {!isPlaying && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 cursor-pointer bg-black/40"
          onClick={handlePlay}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/30"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
          <p className="text-sm sm:text-base text-white/80 font-medium">{t('video_watch')}</p>
          <p className="text-xs text-white/40">{t('video_duration')}</p>
        </div>
      )}
    </div>
  );
}

/* ================================================================
 * MAIN FUNNEL, Highly visual sales page for /audit
 * ================================================================ */
export function FunnelContent() {
  const t = useTranslations('call');

  return (
    <div className="page-transition overflow-hidden">

      {/* ================================================================
       * 1. BANNER, Urgency / announcement bar
       * ================================================================ */}
      <div className="bg-gradient-to-r from-orange-500/10 via-red-500/5 to-orange-500/10 border-b border-orange-500/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2 text-xs sm:text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-gray-300">
            {t.rich('banner', {
              strong: (chunks) => <strong className="text-orange-400">{chunks}</strong>,
            })}
          </span>
        </div>
      </div>

      {/* ================================================================
       * 2. SOCIAL PROOF BAR, Stats with visual accents
       * ================================================================ */}
      <Section className="py-6 sm:py-8 px-5 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { value: 6, suffix: '', label: t('stat_brands') },
              { value: 6, suffix: '', label: t('stat_industries') },
              { value: 100, suffix: '%', label: t('stat_custom') },
              { value: 30, suffix: t('stat_min'), label: t('stat_call') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                variants={fadeUp}
              >
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================
       * 3. HERO, Bold headline with visual background
       * ================================================================ */}
      <section className="relative pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 px-5 sm:px-6 text-center overflow-hidden">
        {/* Animated background orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/[0.04] blur-[120px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-red-500/[0.03] blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Image
              src="/logo.svg"
              alt="Blok Blok Studio"
              width={240}
              height={75}
              className="h-14 sm:h-16 lg:h-20 w-auto mx-auto"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs sm:text-sm mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            {t('hero_badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            {t.rich('hero_title', {
              gradient: (chunks) => (
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CTAButton />
            <CTAButton text={t('cta_see_work')} variant="secondary" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xs text-gray-600 mt-6 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            {t('hero_note')}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-orange-400"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ================================================================
       * 4. VIDEO SALES LETTER, Pitch video
       * ================================================================ */}
      <Section className="py-8 sm:py-12 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <PitchVideo />
        </div>
      </Section>

      {/* ================================================================
       * 5. CTA, Mid-page call to action
       * ================================================================ */}
      <Section className="py-12 sm:py-16 px-5 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <AccentDivider />
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-orange-400/60 mb-4 mt-4">{t('midcta_eyebrow')}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('midcta_title')}
          </h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {t('midcta_subtitle')}
          </p>
          <CTAButton />
        </div>
      </Section>

      {/* ================================================================
       * 6. STORY + PROBLEM, Visual narrative section
       * ================================================================ */}
      <Section className="py-20 sm:py-28 lg:py-36 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
                {t('story_badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t.rich('story_title', {
                  gradient: (chunks) => (
                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{chunks}</span>
                  ),
                })}
              </h2>
              <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                <p>
                  {t('story_p1')}
                </p>
                <p>
                  {t('story_p2')}
                </p>
                <p className="text-white font-medium">
                  {t('story_p3')}
                </p>
              </div>
            </div>

            {/* Visual problem cards with colored accents */}
            <div className="space-y-4">
              {[
                { icon: '😤', problem: t('problem_1'), color: 'border-l-red-500/40' },
                { icon: '📉', problem: t('problem_2'), color: 'border-l-orange-500/40' },
                { icon: '⏰', problem: t('problem_3'), color: 'border-l-yellow-500/40' },
                { icon: '🤷', problem: t('problem_4'), color: 'border-l-amber-500/40' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  variants={fadeUp}
                  className={`bg-white/[0.03] border border-white/5 border-l-4 ${item.color} rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-start gap-4 hover:bg-white/[0.05] transition-colors`}
                >
                  <span className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</span>
                  <p className="text-sm sm:text-base text-gray-300">{item.problem}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================
       * 7. SOCIAL PROOF, Trusted by Brands That Dare to Stand Out
       * ================================================================ */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.02] via-transparent to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <Section>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
                {t('portfolio_badge')}
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
              {t.rich('portfolio_title', {
                gradient: (chunks) => (
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-12 sm:mb-16 max-w-2xl mx-auto">
              {t('portfolio_subtitle')}
            </p>
          </Section>

          {/* Brand showcase grid, 3x2 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {trustedBrands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                variants={scaleUp}
                className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 hover:border-orange-500/20 transition-all duration-500"
              >
                {/* Project screenshot */}
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Brand info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="text-xs text-orange-400/80 mb-1">{t(brand.categoryKey)}</p>
                  <h3 className="text-sm sm:text-base font-semibold text-white">{brand.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{brand.url}</p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <CTAButton text={t('cta_join_brands')} />
          </div>
        </div>
      </section>

      {/* ================================================================
       * 8. TRANSFORMATION, Visual before/after
       * ================================================================ */}
      <Section className="py-20 sm:py-28 lg:py-36 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
              {t('transform_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t.rich('transform_title', {
                gradient: (chunks) => (
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{chunks}</span>
                ),
              })}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Before */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5 }}
              className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-red-500/[0.06] to-transparent border border-red-500/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-4 h-4 rounded-full bg-red-500/60 shadow-lg shadow-red-500/20" />
                <p className="text-sm font-bold text-red-400/80 uppercase tracking-wider">{t('before_label')}</p>
              </div>
              <ul className="space-y-5 relative z-10">
                {[1, 2, 3, 4, 5, 6].map((n) => t(`before_${n}`)).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-400">
                    <svg className="w-5 h-5 flex-shrink-0 text-red-500/60 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }}
              className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-green-500/[0.06] to-transparent border border-green-500/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-4 h-4 rounded-full bg-green-500/60 shadow-lg shadow-green-500/20" />
                <p className="text-sm font-bold text-green-400/80 uppercase tracking-wider">{t('after_label')}</p>
              </div>
              <ul className="space-y-5 relative z-10">
                {[1, 2, 3, 4, 5, 6].map((n) => t(`after_${n}`)).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-300">
                    <svg className="w-5 h-5 flex-shrink-0 text-green-500/60 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ================================================================
       * 9. BENEFITS, Visual cards with colored gradients
       * ================================================================ */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.01] to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
              {t('benefits_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t('benefits_title')}
            </h2>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {benefitCards.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${b.color} border border-white/5 overflow-hidden group hover:border-white/10 transition-colors`}
              >
                <span className="text-3xl sm:text-4xl mb-5 block">{b.icon}</span>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{t(`benefit_${i + 1}_title`)}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{t(`benefit_${i + 1}_desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
       * 10. ROADMAP, Alternating zigzag layout with SVG illustrations
       * ================================================================ */}
      <section className="py-20 sm:py-28 lg:py-36 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.015] to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Section>
            <div className="text-center mb-14 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
                {t('roadmap_badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {t.rich('roadmap_title', {
                  gradient: (chunks) => (
                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{chunks}</span>
                  ),
                })}
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-6">
                {t('roadmap_subtitle')}
              </p>
            </div>
          </Section>

          {/* Timeline with alternating steps */}
          <div className="relative">
            {/* Center vertical timeline line, hidden on mobile */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
              <div className="h-full bg-gradient-to-b from-orange-500/30 via-orange-500/10 to-transparent" />
            </div>

            {/* Mobile left-side timeline line */}
            <div className="lg:hidden absolute left-5 top-0 bottom-0 w-px">
              <div className="h-full bg-gradient-to-b from-orange-500/30 via-orange-500/10 to-transparent" />
            </div>

            <div className="space-y-12 lg:space-y-20">
              {roadmapStepNums.map((num, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    variants={fadeUp}
                    className="relative"
                  >
                    {/* Step number circle on timeline, desktop (centered) */}
                    <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-20">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20 border-4 border-black">
                        <span className="text-sm font-bold text-white">{num}</span>
                      </div>
                    </div>

                    {/* Step number circle, mobile (left side) */}
                    <div className="lg:hidden absolute left-0 top-0 z-20">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20 border-[3px] border-black">
                        <span className="text-xs font-bold text-white">{num}</span>
                      </div>
                    </div>

                    {/* Desktop: Alternating layout */}
                    <div className={`hidden lg:grid lg:grid-cols-2 lg:gap-16 items-center ${isEven ? '' : ''}`}>
                      {/* Illustration side */}
                      <div className={`${isEven ? 'lg:order-1 lg:pr-12' : 'lg:order-2 lg:pl-12'}`}>
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          variants={scaleUp}
                          className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.02] to-white/[0.005] border border-white/5 p-6 flex items-center justify-center group hover:border-orange-500/10 transition-colors"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <StepIllustration step={num} />
                        </motion.div>
                      </div>

                      {/* Text side */}
                      <div className={`${isEven ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12 lg:text-right'}`}>
                        <div className={`flex items-center gap-3 mb-3 flex-wrap ${isEven ? '' : 'lg:justify-end'}`}>
                          <span className="text-xs font-bold text-orange-400/70 uppercase tracking-wider">{t('step_label', { num })}</span>
                          <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400/60 border border-orange-500/10">{t(`step_${i + 1}_duration`)}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4">{t(`step_${i + 1}_title`)}</h3>
                        <p className="text-base text-gray-400 leading-relaxed max-w-md">{t(`step_${i + 1}_desc`)}</p>
                      </div>
                    </div>

                    {/* Mobile: Stacked layout with left offset */}
                    <div className="lg:hidden pl-14">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="text-xs font-bold text-orange-400/70 uppercase tracking-wider">{t('step_label', { num })}</span>
                        <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400/60 border border-orange-500/10">{t(`step_${i + 1}_duration`)}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{t(`step_${i + 1}_title`)}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-5">{t(`step_${i + 1}_desc`)}</p>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.02] to-white/[0.005] border border-white/5 p-4 flex items-center justify-center">
                        <StepIllustration step={num} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-16">
            <CTAButton text={t('cta_start_step1')} />
          </div>
        </div>
      </section>

      {/* ================================================================
       * 11. SERVICE MODULAR BREAKDOWN, Visual module cards
       * ================================================================ */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.015] to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
              {t('modules_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t('modules_title')}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-6">
              {t('modules_subtitle')}
            </p>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {serviceModuleIcons.map((icon, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.5 }}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/5 hover:border-orange-500/10 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="text-lg sm:text-xl font-semibold">{t(`module_${i + 1}_title`)}</h3>
                </div>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((j) => (
                    <li key={j} className="flex items-center gap-3 text-sm sm:text-base text-gray-400">
                      <svg className="w-4 h-4 flex-shrink-0 text-orange-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {t(`module_${i + 1}_item_${j}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
       * 12. SOCIAL PROOF, Project showcase with visual stats
       *
       * TODO: Replace gradient backgrounds with real project screenshots.
       * Use <Image src="/projects/name.jpg" fill className="object-cover" />
       * ================================================================ */}
      <Section className="py-20 sm:py-28 lg:py-36 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
              {t('work_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t('work_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {projectShowcase.map((project, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                variants={scaleUp}
                className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Real project screenshot */}
                <Image
                  src={project.image}
                  alt={project.label}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Stats overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="text-xs text-gray-400 mb-1">{project.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{project.stat}</span>
                    <span className="text-sm text-gray-400">{t(`showcase_${i + 1}_metric`)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{project.url}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================
       * 13. WHAT'S INCLUDED, Visual checklist with icons
       * ================================================================ */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.02] via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
              {t('included_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t('included_title')}
            </h2>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {includedIcons.map((icon, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-orange-500/10 transition-colors">
                <span className="text-xl flex-shrink-0">{icon}</span>
                <span className="text-sm sm:text-base text-gray-300">{t(`included_${i + 1}`)}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <CTAButton text={t('cta_get_all')} />
          </div>
        </div>
      </section>

      {/* ================================================================
       * 14. FREE AUDIT, Lead capture form
       * Connected to /api/audit → Prisma DB + Email + Telegram notifications
       * ================================================================ */}
      <section id="call" className="pt-10 sm:pt-12 lg:pt-14 pb-20 sm:pb-28 lg:pb-36 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.03] via-red-500/[0.015] to-transparent" />
        <motion.div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/[0.03] blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <Section>
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
                {t('call_badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {t.rich('call_title', {
                  gradient: (chunks) => (
                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{chunks}</span>
                  ),
                })}
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                {t('call_subtitle')}
              </p>
            </div>
          </Section>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form, takes 3 columns */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ duration: 0.5 }} variants={fadeUp}
              className="lg:col-span-3 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 bg-white/[0.02] border border-white/5"
            >
              <AuditForm />
            </motion.div>

            {/* Benefits sidebar, takes 2 columns */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }} variants={fadeUp}
              className="lg:col-span-2"
            >
              <div className="sticky top-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-6">{t('sidebar_title')}</h3>
                <ul className="space-y-4 mb-8">
                  {[1, 2, 3, 4, 5].map((n) => t(`sidebar_benefit_${n}`)).map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial="hidden" whileInView="visible" viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base text-gray-300">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Trust reassurance */}
                <div className="rounded-2xl p-5 sm:p-6 bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-white">{t('trust_title')}</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {t('trust_body')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * 15. WHO IT'S FOR, Visual comparison
       * ================================================================ */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.01] to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
              {t('whofor_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t('whofor_title')}
            </h2>
          </div>

          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 bg-white/[0.02] border border-white/5">
            <div className="space-y-3">
              {idealFor.map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }} variants={fadeUp}
                  className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl ${item.yes ? 'bg-green-500/[0.03] border border-green-500/5' : 'bg-red-500/[0.03] border border-red-500/5'}`}>
                  {item.yes ? (
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-red-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                  <span className={`text-sm sm:text-base ${item.yes ? 'text-gray-300' : 'text-gray-500'}`}>
                    {t(`whofor_${i + 1}`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * 17. COMPARISON TABLE, DIY vs Freelancer vs Blok Blok
       * ================================================================ */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Section>
            <div className="text-center mb-14 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
                {t('compare_badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {t('compare_title')}
              </h2>
              <p className="text-gray-400 mt-4 max-w-lg mx-auto">{t('compare_subtitle')}</p>
            </div>
          </Section>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-2 sm:pr-4 text-gray-500 font-normal w-1/4" />
                  <th className="py-4 px-1 sm:px-4 text-center text-gray-500 font-medium text-[10px] sm:text-xs uppercase tracking-wider">{t('compare_col_diy')}</th>
                  <th className="py-4 px-1 sm:px-4 text-center text-gray-500 font-medium text-[10px] sm:text-xs uppercase tracking-wider">{t('compare_col_freelancer')}</th>
                  <th className="py-4 px-2 sm:px-6 text-center font-bold relative">
                    <div className="absolute inset-x-0 -top-2 bottom-0 bg-gradient-to-b from-orange-500/10 to-transparent rounded-t-2xl border-t-2 border-x border-orange-500/30 border-b-0" />
                    <span className="relative z-10 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent text-xs sm:text-sm">Blok Blok Studio</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: t('compare_row_1'), diy: 'no', freelancer: 'no', us: 'yes' },
                  { feature: t('compare_row_2'), diy: 'no', freelancer: 'sometimes', us: 'yes' },
                  { feature: t('compare_row_3'), diy: 'no', freelancer: 'yes', us: 'yes' },
                  { feature: t('compare_row_4'), diy: 'sometimes', freelancer: 'sometimes', us: 'yes' },
                  { feature: t('compare_row_5'), diy: 'no', freelancer: 'no', us: 'yes' },
                  { feature: t('compare_row_6'), diy: 'no', freelancer: 'no', us: 'yes' },
                  { feature: t('compare_row_7'), diy: 'no', freelancer: 'sometimes', us: 'yes' },
                  { feature: t('compare_row_8'), diy: 'no', freelancer: 'no', us: 'yes' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-2 sm:pr-4 text-gray-300 font-medium">{row.feature}</td>
                    {([row.diy, row.freelancer, row.us] as string[]).map((val, j) => (
                      <td key={j} className={`py-4 px-1 sm:px-4 text-center ${j === 2 ? 'relative' : ''}`}>
                        {j === 2 && <div className="absolute inset-x-0 inset-y-0 bg-orange-500/[0.04] border-x border-orange-500/10" />}
                        {val === 'yes' ? (
                          j === 2 ? (
                            <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/15">
                              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </span>
                          ) : (
                            <svg className="w-4 h-4 mx-auto text-yellow-600/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          )
                        ) : val === 'sometimes' ? (
                          <span className="text-yellow-600/50 text-xs font-medium">~</span>
                        ) : (
                          <svg className="w-4 h-4 text-red-500/30 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Bottom highlight for Blok Blok column */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">{t('compare_footnote')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * 18. FAQ & OBJECTION HANDLING
       * ================================================================ */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.01] to-transparent" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
              {t('faq_badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t('faq_title')}
            </h2>
            <p className="text-gray-400 mt-4">{t('faq_subtitle')}</p>
          </div>

          {[1, 2, 3, 4, 5, 6].map((n) => (
            <FAQItem key={n} q={t(`faq_${n}_q`)} a={t(`faq_${n}_a`)} />
          ))}
        </div>
      </section>

      {/* ================================================================
       * FINAL CTA, Get Your Free Audit
       * ================================================================ */}
      <section className="py-20 sm:py-28 lg:py-36 px-5 sm:px-6">
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] p-10 sm:p-14 md:p-20 border border-orange-500/10">
              {/* Rich gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.08] via-red-500/[0.04] to-transparent" />
              <motion.div
                className="absolute top-0 right-0 w-80 h-80 rounded-full bg-orange-500/[0.05] blur-[100px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-red-500/[0.03] blur-[80px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6">
                  {t('final_badge')}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {t('final_title')}
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto mb-10">
                  {t('final_subtitle')}
                </p>

                <CTAButton text={t('cta_book_call')} />

                <p className="text-xs text-gray-600 mt-6 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {t('final_footnote')}
                </p>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* ── Minimal footer ── */}
      <footer className="py-8 px-5 text-center border-t border-white/5">
        <p className="text-xs text-gray-600">
          {t('footer_copyright', { year: new Date().getFullYear() })}
        </p>
      </footer>
    </div>
  );
}
