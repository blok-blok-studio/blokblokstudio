export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'Blok Blok Studio',
    url: 'https://blokblokstudio.com',
    logo: 'https://blokblokstudio.com/logo.png',
    description:
      'A creative digital agency crafting bold brands, stunning websites, and digital products that move people.',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@blokblokstudio.com',
      availableLanguage: ['English', 'German', 'French', 'Spanish'],
    },
    sameAs: [
      'https://www.instagram.com/blokblokstudio/',
      'https://www.linkedin.com/company/blok-blok-studio/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
    areaServed: {
      '@type': 'GeoShape',
      name: 'Worldwide',
    },
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'AI & Automation',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agent Ecosystems' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conversational AI' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workflow Automation' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Content Systems' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Client Dashboards' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Creative & Marketing',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Websites' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads' } },
          ],
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Blok Blok Studio',
    url: 'https://blokblokstudio.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://blokblokstudio.com/projects?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://blokblokstudio.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const services = [
    {
      name: 'AI Agent Ecosystems',
      description: 'Interconnected AI sub-agents that run entire business workflows with multi-agent orchestration and human-in-the-loop escalation.',
    },
    {
      name: 'Conversational AI',
      description: 'Chatbots and voice agents that qualify leads nonstop with website AI chat widgets and appointment booking on autopilot.',
    },
    {
      name: 'Workflow Automation',
      description: 'Connect CRM, calendar, and payments into one seamless system with custom integrations and AI decision logic.',
    },
    {
      name: 'AI Content Systems',
      description: 'Turn one input into 10 pieces of content with video-to-clips pipelines, blog generation, and cross-platform repurposing.',
    },
    {
      name: 'Client Dashboards',
      description: 'Real-time portals with live lead tracking, ad spend reporting, and white-labeled KPI widgets.',
    },
    {
      name: 'Websites',
      description: 'Custom-built, conversion-focused sites with Next.js and React, SEO-optimized and mobile-first.',
    },
    {
      name: 'Branding',
      description: 'Bold visual identities including logo design, color palettes, typography, and brand guidelines documents.',
    },
    {
      name: 'Google Ads',
      description: 'Search campaigns for high-intent buyers with keyword strategy, conversion tracking, and monthly optimization.',
    },
    {
      name: 'Meta Ads',
      description: 'Facebook and Instagram advertising at scale with audience targeting, retargeting funnels, and creative A/B testing.',
    },
  ];

  const schema = services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@type': 'Organization',
      name: 'Blok Blok Studio',
      url: 'https://blokblokstudio.com',
    },
    description: service.description,
    areaServed: 'Worldwide',
  }));

  return (
    <>
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': 'https://blokblokstudio.com/#organization',
    name: 'Blok Blok Studio',
    alternateName: 'BlokBlok Studio',
    description:
      'Berlin-based digital agency building AI agents, voice assistants, workflow automation, and custom Next.js websites for ambitious brands worldwide.',
    image: 'https://blokblokstudio.com/logo-hero.png',
    logo: 'https://blokblokstudio.com/logo.svg',
    url: 'https://blokblokstudio.com',
    email: 'hello@blokblokstudio.com',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Chase Haynes',
      jobTitle: 'Founder',
      alumniOf: 'Parsons School of Design',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressRegion: 'Berlin',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.52,
      longitude: 13.405,
    },
    areaServed: [
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    knowsLanguage: ['English', 'German', 'French', 'Spanish'],
    knowsAbout: [
      'AI Agents',
      'Conversational AI',
      'Voice Agents',
      'Workflow Automation',
      'Web Design',
      'Next.js Development',
      'Branding',
      'Google Ads',
      'Meta Ads',
      'SEO',
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD, EUR',
    paymentAccepted: 'Credit Card, Bank Transfer, Stripe',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 3 },
    sameAs: [
      'https://www.instagram.com/blokblokstudio/',
      'https://www.linkedin.com/company/blok-blok-studio/',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
