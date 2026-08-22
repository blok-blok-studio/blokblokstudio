'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ──────────────────────────────────────────────────────────────────

interface Contact {
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

interface Credential {
  platform: string;
  username: string;
  password: string;
  url: string;
  notes: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface FormData {
  contacts: Contact[];
  credentials: Credential[];
  socialLinks: SocialLink[];
  timezone: string;
  telegramChatId: string;
  notes: string;
  brandGuidelines: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

const CREDENTIAL_PLATFORMS = [
  // Website & Hosting
  'WordPress', 'Shopify', 'Vercel', 'Railway', 'Render', 'AWS', 'Netlify',
  // CMS & Design
  'Sanity', 'Contentful', 'Figma', 'Canva',
  // CRM & Automation
  'GoHighLevel (GHL)', 'HubSpot', 'Salesforce', 'Zapier', 'Make',
  // Social Media
  'Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'X / Twitter', 'YouTube', 'Pinterest',
  // Social Scheduling
  'Buffer', 'Later', 'Linktree',
  // Ads & Analytics
  'Google Ads', 'Meta Ads', 'Google Analytics', 'Google Search Console', 'Google Tag Manager',
  // Email & Comms
  'SendGrid', 'Twilio', 'Slack', 'Calendly',
  // Payments & Finance
  'Stripe', 'QuickBooks', 'Xero',
  // Dev & AI
  'GitHub', 'Linear', 'OpenAI', 'Anthropic',
  // Auth & Services
  'Clerk', 'Google Calendar', 'Notion', 'Google Maps',
  // Catch-all
  'Other',
];

const SOCIAL_PLATFORMS = [
  'Instagram', 'Twitter/X', 'LinkedIn', 'Facebook', 'TikTok',
  'YouTube', 'Pinterest', 'Dribbble', 'Behance', 'GitHub', 'Other',
];

const STEPS = [
  'Team Contacts',
  'Account Access',
  'Social Profiles',
  'Project Details',
  'Review & Submit',
];

const COMMON_TIMEZONES = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Anchorage', 'Pacific/Honolulu', 'America/Toronto', 'America/Vancouver',
  'America/Mexico_City', 'America/Sao_Paulo', 'America/Argentina/Buenos_Aires',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Madrid',
  'Europe/Rome', 'Europe/Amsterdam', 'Europe/Stockholm', 'Europe/Moscow',
  'Asia/Dubai', 'Asia/Kolkata', 'Asia/Bangkok', 'Asia/Singapore',
  'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Seoul', 'Asia/Hong_Kong',
  'Australia/Sydney', 'Australia/Melbourne', 'Pacific/Auckland',
  'Africa/Cairo', 'Africa/Lagos', 'Africa/Johannesburg',
];

const COUNTRY_CODES = [
  { code: '+1', flag: '\u{1F1FA}\u{1F1F8}', label: 'US +1' },
  { code: '+1', flag: '\u{1F1E8}\u{1F1E6}', label: 'CA +1' },
  { code: '+44', flag: '\u{1F1EC}\u{1F1E7}', label: 'GB +44' },
  { code: '+49', flag: '\u{1F1E9}\u{1F1EA}', label: 'DE +49' },
  { code: '+33', flag: '\u{1F1EB}\u{1F1F7}', label: 'FR +33' },
  { code: '+34', flag: '\u{1F1EA}\u{1F1F8}', label: 'ES +34' },
  { code: '+39', flag: '\u{1F1EE}\u{1F1F9}', label: 'IT +39' },
  { code: '+31', flag: '\u{1F1F3}\u{1F1F1}', label: 'NL +31' },
  { code: '+46', flag: '\u{1F1F8}\u{1F1EA}', label: 'SE +46' },
  { code: '+41', flag: '\u{1F1E8}\u{1F1ED}', label: 'CH +41' },
  { code: '+43', flag: '\u{1F1E6}\u{1F1F9}', label: 'AT +43' },
  { code: '+351', flag: '\u{1F1F5}\u{1F1F9}', label: 'PT +351' },
  { code: '+55', flag: '\u{1F1E7}\u{1F1F7}', label: 'BR +55' },
  { code: '+52', flag: '\u{1F1F2}\u{1F1FD}', label: 'MX +52' },
  { code: '+54', flag: '\u{1F1E6}\u{1F1F7}', label: 'AR +54' },
  { code: '+81', flag: '\u{1F1EF}\u{1F1F5}', label: 'JP +81' },
  { code: '+82', flag: '\u{1F1F0}\u{1F1F7}', label: 'KR +82' },
  { code: '+86', flag: '\u{1F1E8}\u{1F1F3}', label: 'CN +86' },
  { code: '+91', flag: '\u{1F1EE}\u{1F1F3}', label: 'IN +91' },
  { code: '+61', flag: '\u{1F1E6}\u{1F1FA}', label: 'AU +61' },
  { code: '+64', flag: '\u{1F1F3}\u{1F1FF}', label: 'NZ +64' },
  { code: '+971', flag: '\u{1F1E6}\u{1F1EA}', label: 'AE +971' },
  { code: '+966', flag: '\u{1F1F8}\u{1F1E6}', label: 'SA +966' },
  { code: '+27', flag: '\u{1F1FF}\u{1F1E6}', label: 'ZA +27' },
  { code: '+234', flag: '\u{1F1F3}\u{1F1EC}', label: 'NG +234' },
  { code: '+20', flag: '\u{1F1EA}\u{1F1EC}', label: 'EG +20' },
  { code: '+7', flag: '\u{1F1F7}\u{1F1FA}', label: 'RU +7' },
  { code: '+380', flag: '\u{1F1FA}\u{1F1E6}', label: 'UA +380' },
  { code: '+48', flag: '\u{1F1F5}\u{1F1F1}', label: 'PL +48' },
  { code: '+90', flag: '\u{1F1F9}\u{1F1F7}', label: 'TR +90' },
  { code: '+65', flag: '\u{1F1F8}\u{1F1EC}', label: 'SG +65' },
  { code: '+60', flag: '\u{1F1F2}\u{1F1FE}', label: 'MY +60' },
  { code: '+66', flag: '\u{1F1F9}\u{1F1ED}', label: 'TH +66' },
  { code: '+63', flag: '\u{1F1F5}\u{1F1ED}', label: 'PH +63' },
  { code: '+852', flag: '\u{1F1ED}\u{1F1F0}', label: 'HK +852' },
  { code: '+353', flag: '\u{1F1EE}\u{1F1EA}', label: 'IE +353' },
  { code: '+47', flag: '\u{1F1F3}\u{1F1F4}', label: 'NO +47' },
  { code: '+45', flag: '\u{1F1E9}\u{1F1F0}', label: 'DK +45' },
  { code: '+358', flag: '\u{1F1EB}\u{1F1EE}', label: 'FI +358' },
  { code: '+32', flag: '\u{1F1E7}\u{1F1EA}', label: 'BE +32' },
];

function emptyContact(isPrimary = false): Contact {
  return { name: '', role: '', email: '', phone: '', isPrimary };
}

function emptyCredential(): Credential {
  return { platform: '', username: '', password: '', url: '', notes: '' };
}

function emptySocialLink(): SocialLink {
  return { platform: '', url: '' };
}

// ── Shared UI helpers ──────────────────────────────────────────────────────

function Input({
  label, value, onChange, type = 'text', placeholder = '', required = false,
  maxLength, autoComplete,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
  maxLength?: number; autoComplete?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function PhoneInput({
  label, value, onChange,
}: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  // Parse existing value to extract country code and number
  const parsePhone = (val: string) => {
    for (const cc of COUNTRY_CODES) {
      if (val.startsWith(cc.code + ' ')) {
        return { countryCode: cc.code, number: val.slice(cc.code.length + 1) };
      }
    }
    return { countryCode: '+1', number: val };
  };

  const { countryCode, number } = parsePhone(value);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  const handleCodeChange = (newCode: string) => {
    onChange(number ? `${newCode} ${number}` : '');
  };

  const handleNumberChange = (newNumber: string) => {
    // Strip non-digit characters except spaces and dashes
    const cleaned = newNumber.replace(/[^\d\s\-()]/g, '');
    onChange(cleaned ? `${countryCode} ${cleaned}` : '');
  };

  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      <div className="flex gap-2">
        <select
          value={`${selectedCountry.flag} ${selectedCountry.label}`}
          onChange={(e) => {
            const match = e.target.value.match(/[+-]\d+/);
            if (match) handleCodeChange(match[0]);
          }}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none text-sm shrink-0 w-[120px]"
        >
          {COUNTRY_CODES.map((cc, i) => (
            <option key={`${cc.label}-${i}`} value={`${cc.flag} ${cc.label}`} className="bg-gray-900">
              {cc.flag} {cc.label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          value={number}
          onChange={(e) => handleNumberChange(e.target.value)}
          placeholder="Phone number"
          maxLength={30}
          autoComplete="tel-national"
          className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>
    </div>
  );
}

function Select({
  label, value, onChange, options, required = false, placeholder = 'Select...',
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
      >
        <option value="" className="bg-gray-900">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-gray-900">{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Textarea({
  label, value, onChange, placeholder = '', maxLength, rows = 4,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; maxLength?: number; rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
      />
      {maxLength && (
        <p className="text-xs text-gray-600 mt-1 text-right">{value.length}/{maxLength}</p>
      )}
    </div>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-10">
      {/* Step labels - hidden on mobile, shown on md+ */}
      <div className="hidden md:flex justify-between mb-3">
        {STEPS.map((step, i) => (
          <span
            key={step}
            className={`text-xs font-medium transition-colors ${
              i <= currentStep ? 'text-white' : 'text-gray-600'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
      {/* Mobile: just show current step */}
      <div className="md:hidden mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-white">
          Step {currentStep + 1}: {STEPS[currentStep]}
        </span>
        <span className="text-xs text-gray-500">{currentStep + 1}/{STEPS.length}</span>
      </div>
      {/* Bar */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={false}
          animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

// ── Step Components ────────────────────────────────────────────────────────

function StepContacts({
  contacts, setContacts,
}: {
  contacts: Contact[];
  setContacts: (c: Contact[]) => void;
}) {
  const update = (i: number, field: keyof Contact, value: string | boolean) => {
    const next = [...contacts];
    next[i] = { ...next[i], [field]: value };
    setContacts(next);
  };

  const add = () => setContacts([...contacts, emptyContact()]);

  const remove = (i: number) => {
    if (contacts.length <= 1) return;
    const next = contacts.filter((_, idx) => idx !== i);
    if (!next.some((c) => c.isPrimary)) next[0].isPrimary = true;
    setContacts(next);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Team Contacts</h2>
        <p className="text-sm text-gray-400">Who should we reach out to on your team?</p>
      </div>

      {contacts.map((contact, i) => (
        <div key={i} className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {contact.isPrimary && (
                <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded-full">
                  Primary
                </span>
              )}
              <span className="text-sm text-gray-400">Contact {i + 1}</span>
            </div>
            {contacts.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-gray-600 hover:text-red-400 transition-colors text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={contact.name}
              onChange={(v) => update(i, 'name', v)}
              required
              maxLength={200}
              autoComplete="name"
            />
            <Input
              label="Role / Title"
              value={contact.role}
              onChange={(v) => update(i, 'role', v)}
              placeholder="e.g. CEO, Marketing Director"
              maxLength={100}
            />
            <Input
              label="Email"
              value={contact.email}
              onChange={(v) => update(i, 'email', v)}
              type="email"
              maxLength={254}
              autoComplete="email"
            />
            <PhoneInput
              label="Phone"
              value={contact.phone}
              onChange={(v) => update(i, 'phone', v)}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        Add another contact
      </button>
    </div>
  );
}

function StepCredentials({
  credentials, setCredentials,
}: {
  credentials: Credential[];
  setCredentials: (c: Credential[]) => void;
}) {
  const update = (i: number, field: keyof Credential, value: string) => {
    const next = [...credentials];
    next[i] = { ...next[i], [field]: value };
    setCredentials(next);
  };

  const add = () => setCredentials([...credentials, emptyCredential()]);

  const remove = (i: number) => {
    if (credentials.length <= 1) return;
    setCredentials(credentials.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Account Access</h2>
        <p className="text-sm text-gray-400">
          Share credentials for the platforms you&apos;d like us to manage.
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Your credentials are encrypted with AES-256
        </div>
      </div>

      {credentials.map((cred, i) => (
        <div key={i} className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Account {i + 1}</span>
            {credentials.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-gray-600 hover:text-red-400 transition-colors text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <Select
            label="Platform"
            value={cred.platform}
            onChange={(v) => update(i, 'platform', v)}
            options={CREDENTIAL_PLATFORMS}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Username / Email"
              value={cred.username}
              onChange={(v) => update(i, 'username', v)}
              required
              maxLength={200}
            />
            <Input
              label="Password"
              value={cred.password}
              onChange={(v) => update(i, 'password', v)}
              type="password"
              required
              maxLength={500}
            />
          </div>
          <Input
            label="URL (optional)"
            value={cred.url}
            onChange={(v) => update(i, 'url', v)}
            placeholder="e.g. https://your-site.com/wp-admin"
            maxLength={500}
          />
          <Textarea
            label="Notes (optional)"
            value={cred.notes}
            onChange={(v) => update(i, 'notes', v)}
            placeholder="e.g. 2FA enabled, use authenticator app"
            maxLength={1000}
            rows={2}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        Add another account
      </button>
    </div>
  );
}

function StepSocials({
  socialLinks, setSocialLinks,
}: {
  socialLinks: SocialLink[];
  setSocialLinks: (s: SocialLink[]) => void;
}) {
  const update = (i: number, field: keyof SocialLink, value: string) => {
    const next = [...socialLinks];
    next[i] = { ...next[i], [field]: value };
    setSocialLinks(next);
  };

  const add = () => setSocialLinks([...socialLinks, emptySocialLink()]);

  const remove = (i: number) => {
    if (socialLinks.length <= 1) return;
    setSocialLinks(socialLinks.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Social Profiles</h2>
        <p className="text-sm text-gray-400">
          Link your social media accounts so we can manage and grow your presence.
        </p>
      </div>

      {socialLinks.map((link, i) => (
        <div key={i} className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Profile {i + 1}</span>
            {socialLinks.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-gray-600 hover:text-red-400 transition-colors text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Platform"
              value={link.platform}
              onChange={(v) => update(i, 'platform', v)}
              options={SOCIAL_PLATFORMS}
            />
            <Input
              label="URL"
              value={link.url}
              onChange={(v) => update(i, 'url', v)}
              placeholder="https://..."
              maxLength={500}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        Add another profile
      </button>
    </div>
  );
}

function StepDetails({
  formData, setFormData,
}: {
  formData: FormData;
  setFormData: (fn: (prev: FormData) => FormData) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Project Details</h2>
        <p className="text-sm text-gray-400">Help us tailor our workflow to yours.</p>
      </div>

      <Select
        label="Timezone"
        value={formData.timezone}
        onChange={(v) => setFormData((prev) => ({ ...prev, timezone: v }))}
        options={COMMON_TIMEZONES}
        placeholder="Select your timezone..."
      />

      <div>
        <Input
          label="Telegram Chat ID (optional)"
          value={formData.telegramChatId}
          onChange={(v) => setFormData((prev) => ({ ...prev, telegramChatId: v }))}
          placeholder="e.g. 123456789"
          maxLength={30}
        />
        <p className="text-xs text-gray-600 mt-1">
          Message @blokblok_bot on Telegram to get your ID
        </p>
      </div>

      <Textarea
        label="Notes / Special Instructions"
        value={formData.notes}
        onChange={(v) => setFormData((prev) => ({ ...prev, notes: v }))}
        placeholder="Anything we should know about your project, preferences, or workflow..."
        maxLength={5000}
      />

      <Textarea
        label="Brand Guidelines"
        value={formData.brandGuidelines}
        onChange={(v) => setFormData((prev) => ({ ...prev, brandGuidelines: v }))}
        placeholder="Logo usage, brand colors, fonts, tone of voice, do's and don'ts..."
        maxLength={10000}
        rows={6}
      />
    </div>
  );
}

function StepReview({
  formData, goToStep,
}: {
  formData: FormData;
  goToStep: (step: number) => void;
}) {
  const filledContacts = formData.contacts.filter((c) => c.name.trim());
  const filledCredentials = formData.credentials.filter((c) => c.platform && c.username);
  const filledSocials = formData.socialLinks.filter((s) => s.platform || s.url);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Review & Submit</h2>
        <p className="text-sm text-gray-400">
          Double-check everything before submitting. You can go back to edit any section.
        </p>
      </div>

      {/* Contacts */}
      <ReviewSection title="Team Contacts" onEdit={() => goToStep(0)} count={filledContacts.length}>
        {filledContacts.map((c, i) => (
          <div key={i} className="text-sm space-y-0.5">
            <p className="text-white font-medium">
              {c.name}
              {c.isPrimary && <span className="text-gray-500 ml-2 text-xs">(Primary)</span>}
            </p>
            {c.role && <p className="text-gray-400">{c.role}</p>}
            {c.email && <p className="text-gray-400">{c.email}</p>}
            {c.phone && <p className="text-gray-400">{c.phone}</p>}
          </div>
        ))}
      </ReviewSection>

      {/* Credentials */}
      <ReviewSection title="Account Access" onEdit={() => goToStep(1)} count={filledCredentials.length}>
        {filledCredentials.map((c, i) => (
          <div key={i} className="text-sm space-y-0.5">
            <p className="text-white font-medium">{c.platform}</p>
            <p className="text-gray-400">{c.username}</p>
            <p className="text-gray-500 text-xs">{'*'.repeat(8)}</p>
          </div>
        ))}
      </ReviewSection>

      {/* Socials */}
      <ReviewSection title="Social Profiles" onEdit={() => goToStep(2)} count={filledSocials.length}>
        {filledSocials.map((s, i) => (
          <div key={i} className="text-sm">
            <span className="text-white">{s.platform}</span>
            {s.url && <span className="text-gray-400 ml-2">{s.url}</span>}
          </div>
        ))}
      </ReviewSection>

      {/* Details */}
      <ReviewSection title="Project Details" onEdit={() => goToStep(3)}>
        <div className="text-sm space-y-1">
          {formData.timezone && (
            <p><span className="text-gray-500">Timezone:</span> <span className="text-gray-300">{formData.timezone}</span></p>
          )}
          {formData.telegramChatId && (
            <p><span className="text-gray-500">Telegram ID:</span> <span className="text-gray-300">{formData.telegramChatId}</span></p>
          )}
          {formData.notes && (
            <div>
              <p className="text-gray-500 mb-0.5">Notes:</p>
              <p className="text-gray-300 whitespace-pre-wrap">{formData.notes}</p>
            </div>
          )}
          {formData.brandGuidelines && (
            <div>
              <p className="text-gray-500 mb-0.5">Brand Guidelines:</p>
              <p className="text-gray-300 whitespace-pre-wrap">{formData.brandGuidelines}</p>
            </div>
          )}
        </div>
      </ReviewSection>
    </div>
  );
}

function ReviewSection({
  title, onEdit, count, children,
}: {
  title: string;
  onEdit: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white">
          {title}
          {count !== undefined && <span className="text-gray-500 ml-2">({count})</span>}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Edit
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function OnboardContent({ token }: { token: string }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'submitted'>('loading');
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    contacts: [emptyContact(true)],
    credentials: [emptyCredential()],
    socialLinks: [emptySocialLink()],
    timezone: '',
    telegramChatId: '',
    notes: '',
    brandGuidelines: '',
  });

  const apiBase = process.env.NEXT_PUBLIC_TRACKER_API_URL || '';

  // Auto-detect timezone
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setFormData((prev) => ({ ...prev, timezone: tz }));
    } catch {
      // ignore
    }
  }, []);

  // Fetch client greeting
  useEffect(() => {
    async function fetchGreeting() {
      try {
        const res = await fetch(`${apiBase}/api/onboard/${token}`);
        if (!res.ok) {
          setErrorMessage('This link has expired or is invalid.');
          setStatus('error');
          return;
        }
        const json = await res.json();
        if (json.success && json.data) {
          setClientName(json.data.name || '');
          setClientCompany(json.data.company || '');
          setStatus('ready');
        } else {
          setErrorMessage(json.error || 'This link has expired or is invalid.');
          setStatus('error');
        }
      } catch {
        setErrorMessage('Unable to connect. Please try again later.');
        setStatus('error');
      }
    }
    fetchGreeting();
  }, [token, apiBase]);

  // Step validation
  const validateStep = useCallback((): boolean => {
    if (step === 0) {
      return formData.contacts.some((c) => c.name.trim().length > 0);
    }
    if (step === 1) {
      return formData.credentials.every((c) => {
        if (!c.platform && !c.username && !c.password) return true;
        return c.platform && c.username && c.password;
      });
    }
    return true;
  }, [step, formData.contacts, formData.credentials]);

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const goToStep = (s: number) => setStep(s);

  // Submit
  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');

    // Clean empty entries
    const payload = {
      contacts: formData.contacts.filter((c) => c.name.trim()),
      credentials: formData.credentials.filter((c) => c.platform && c.username && c.password),
      socialLinks: formData.socialLinks.filter((s) => s.platform || s.url),
      timezone: formData.timezone || undefined,
      telegramChatId: formData.telegramChatId || undefined,
      notes: formData.notes || undefined,
      brandGuidelines: formData.brandGuidelines || undefined,
    };

    try {
      const res = await fetch(`${apiBase}/api/onboard/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus('submitted');
      } else {
        setSubmitError(json.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Unable to connect. Please check your internet and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading ──
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading your onboarding...</p>
        </div>
      </div>
    );
  }

  // ── Error (invalid/expired token) ──
  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">Link Unavailable</h1>
          <p className="text-gray-400">{errorMessage}</p>
          <p className="text-sm text-gray-600 mt-4">
            If you think this is a mistake, please get in touch through{' '}
            <a href="/contact" className="text-white hover:underline">
              our contact page
            </a>
          </p>
        </div>
      </div>
    );
  }

  // ── Success (submitted) ──
  if (status === 'submitted') {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">You&apos;re All Set!</h1>
          <p className="text-gray-400 mb-8">
            Thanks{clientName ? `, ${clientName}` : ''}! Your onboarding is complete. We&apos;ll review everything and be in touch shortly.
          </p>

          {/* Stripe CTA placeholder */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm text-gray-400 mb-4">
              Want to set up your payment method so we can get started right away?
            </p>
            <button
              type="button"
              disabled
              className="w-full bg-white text-black font-medium py-3 px-6 rounded-xl opacity-50 cursor-not-allowed"
            >
              Set Up Payment Method
            </button>
            <p className="text-xs text-gray-600 mt-2">Coming soon</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Form ──
  return (
    <div className="min-h-screen py-12 sm:py-20 px-5">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">Client Onboarding</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-2">
            Welcome{clientName ? `, ${clientName}` : ''}
            {clientCompany ? <span className="text-gray-400 text-2xl sm:text-3xl"> from {clientCompany}</span> : ''}
          </h1>
          <p className="text-gray-400">
            Let&apos;s get everything set up so we can hit the ground running.
          </p>
        </motion.div>

        <ProgressBar currentStep={step} />

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <StepContacts
                contacts={formData.contacts}
                setContacts={(contacts) => setFormData((prev) => ({ ...prev, contacts }))}
              />
            )}
            {step === 1 && (
              <StepCredentials
                credentials={formData.credentials}
                setCredentials={(credentials) => setFormData((prev) => ({ ...prev, credentials }))}
              />
            )}
            {step === 2 && (
              <StepSocials
                socialLinks={formData.socialLinks}
                setSocialLinks={(socialLinks) => setFormData((prev) => ({ ...prev, socialLinks }))}
              />
            )}
            {step === 3 && (
              <StepDetails
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 4 && (
              <StepReview formData={formData} goToStep={goToStep} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          {step > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!validateStep()}
              className="bg-white text-black font-medium py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-white text-black font-medium py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
          )}
        </div>

        {/* Submit error toast */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              {submitError}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
