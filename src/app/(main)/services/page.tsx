import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ServicesContent } from '@/components/ServicesContent';
import { BreadcrumbSchema, FAQSchema } from '@/app/structured-data';

const serviceFaqs = [
  {
    question: 'What is an AI agent ecosystem?',
    answer: 'An AI agent ecosystem is a network of interconnected AI sub-agents that handle entire business workflows autonomously. For example, a lead comes in, gets scored, receives a personalized email, then a text, then a call — all without human intervention. We build these with human-in-the-loop escalation so you stay in control.',
  },
  {
    question: 'How are your AI solutions different from using ChatGPT or off-the-shelf tools?',
    answer: 'Off-the-shelf tools are generic. We build custom AI systems tailored to your business logic, integrated directly into your existing tools like your CRM, calendar, and payment systems. No Zapier tax, no duct tape — just purpose-built automation that runs 24/7.',
  },
  {
    question: 'Do you build websites or just AI automations?',
    answer: 'Both. We build custom websites with Next.js and React that are SEO-optimized and conversion-focused from day one. We also handle branding, Google Ads, and Meta Ads. Think of us as your full-stack digital partner.',
  },
  {
    question: 'What does workflow automation look like in practice?',
    answer: 'It means your CRM, calendar, payments, email, and messaging tools all talk to each other automatically. When a client books a call, the CRM updates, an invoice gets drafted, a Slack notification fires, and a follow-up sequence starts — all without you lifting a finger.',
  },
  {
    question: 'Do you offer client dashboards?',
    answer: 'Yes. We build real-time portals where your clients can see live lead tracking, ad spend, ROAS, and custom KPIs without ever asking you for an update. They are white-labeled to your brand and include automated weekly report emails.',
  },
  {
    question: 'How much does a project cost and how long does it take?',
    answer: 'Every project is scoped based on your needs. A website starts around $5,000, while AI agent ecosystems and full automation builds are scoped individually. We provide a detailed timeline and quote after our discovery call.',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services');
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: '/services' },
    openGraph: {
      title: `${t('title')} | Blok Blok Studio`,
      description: t('subtitle'),
      url: 'https://blokblokstudio.com/services',
      siteName: 'Blok Blok Studio',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Blok Blok Studio Services' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | Blok Blok Studio`,
      description: t('subtitle'),
      images: ['/og-image.jpg'],
    },
  };
}

export default function ServicesPage() {
  return (
    <div className="page-transition">
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
      ]} />
      <FAQSchema faqs={serviceFaqs} />
      <ServicesContent faqs={serviceFaqs} />
    </div>
  );
}
