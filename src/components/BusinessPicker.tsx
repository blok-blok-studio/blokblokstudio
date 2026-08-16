'use client';

import { useState, useRef, useEffect } from 'react';

/* ── Business type presets ── */
const businessTypes = [
  'Coaching / Consulting',
  'E-Commerce / Online Store',
  'SaaS / Software',
  'Agency / Marketing',
  'Real Estate',
  'Healthcare / Medical',
  'Legal / Law Firm',
  'Financial Services',
  'Education / Training',
  'Restaurant / Food & Beverage',
  'Fitness / Wellness',
  'Construction / Trades',
  'Beauty / Salon / Spa',
  'Content Creator / Influencer',
  'Retail / Brick & Mortar',
  'Professional Services',
  'Nonprofit',
  'Automotive',
  'Travel / Hospitality',
  'Other',
];

export function BusinessPicker({ value, onChange, inputBase, id = 'call-business' }: { value: string; onChange: (val: string) => void; inputBase: string; id?: string }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query
    ? businessTypes.filter(t => t.toLowerCase().includes(query.toLowerCase()))
    : businessTypes;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        id={id}
        type="text"
        required
        placeholder="Search or select your industry..."
        value={value || query}
        onChange={(e) => {
          const v = e.target.value;
          setQuery(v);
          onChange('');
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className={inputBase}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-30 left-0 right-0 mt-1.5 max-h-52 overflow-y-auto rounded-xl bg-gray-900 border border-white/15 shadow-xl">
          {filtered.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                onChange(type);
                setQuery('');
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-orange-500/10 hover:text-orange-300 ${
                value === type ? 'text-orange-400 bg-orange-500/[0.06]' : 'text-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
