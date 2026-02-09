export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blok Blok Studio',
    url: 'https://blokblokstudio.com',
    logo: 'https://blokblokstudio.com/logo.png',
    description:
      'A creative digital agency crafting bold brands, stunning websites, and digital products that move people.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-000-0000',
      contactType: 'customer service',
      email: 'hello@blokblokstudio.com',
    },
    sameAs: [
      'https://twitter.com/blokblokstudio',
      'https://instagram.com/blokblokstudio',
      'https://linkedin.com/company/blokblokstudio',
      'https://dribbble.com/blokblokstudio',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Creative Ave',
      addressLocality: 'Design District',
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
