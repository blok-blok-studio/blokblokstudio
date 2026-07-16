export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'Blok Blok Studio',
    url: 'https://blokblokstudio.com',
    logo: 'https://blokblokstudio.com/logo.png',
    description:
      'A creative web design studio crafting custom, conversion-focused websites for ambitious brands.',
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
      name: 'Web Design Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Websites' } },
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
  // Live-site service list, only website design exposed publicly. The
  // remaining services remain in source history for future re-enable.
  const services = [
    {
      name: 'Websites',
      description: 'Custom-built, conversion-focused sites with Next.js and React, SEO-optimized and mobile-first.',
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
      'Berlin-based web design studio building custom Next.js websites for ambitious brands worldwide.',
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
    knowsLanguage: ['English', 'German', 'Spanish', 'French', 'Italian', 'Dutch', 'Portuguese', 'Polish', 'Russian', 'Swedish', 'Turkish', 'Arabic', 'Hindi', 'Indonesian', 'Japanese', 'Korean', 'Thai', 'Vietnamese', 'Chinese'],
    knowsAbout: [
      'Web Design',
      'Next.js Development',
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
