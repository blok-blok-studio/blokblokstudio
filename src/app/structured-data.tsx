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
    '@type': 'LocalBusiness',
    name: 'Blok Blok Studio',
    image: 'https://blokblokstudio.com/og-image.jpg',
    url: 'https://blokblokstudio.com',
    email: 'hello@blokblokstudio.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    numberOfEmployees: '3',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
