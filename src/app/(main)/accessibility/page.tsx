import type { Metadata } from 'next';
import { AccessibilityContent } from '@/components/AccessibilityContent';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    'Blok Blok Studio is committed to digital accessibility. Our site is built to meet WCAG 2.2 AA, ADA, Section 508, and the EU European Accessibility Act.',
  alternates: { canonical: '/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <div className="page-transition">
      <AccessibilityContent />
    </div>
  );
}
