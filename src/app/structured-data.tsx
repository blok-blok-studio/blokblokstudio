import { getLocale, getTranslations } from 'next-intl/server';
import { videoUrls, type SiteVideo, type SiteVideoKey } from '@/data/videos';
import { transcriptAsPlainText } from '@/data/video-transcripts';

export async function OrganizationSchema() {
  const t = await getTranslations('seo');
  const locale = await getLocale();
  const schema = {
    inLanguage: locale,
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'Blok Blok Studio',
    url: 'https://www.blokblokstudio.com',
    logo: 'https://www.blokblokstudio.com/logo.png',
    description: t('org_description'),
    foundingDate: '2024-06',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://www.blokblokstudio.com/contact',
      availableLanguage: ['English', 'German', 'Spanish', 'French', 'Italian', 'Dutch', 'Portuguese', 'Polish', 'Russian', 'Swedish', 'Turkish', 'Arabic', 'Hindi', 'Indonesian', 'Japanese', 'Korean', 'Thai', 'Vietnamese', 'Chinese'],
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
      name: t('worldwide'),
    },
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t('offer_catalog'),
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t('service_name') } },
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

export async function WebsiteSchema() {
  const locale = await getLocale();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Blok Blok Studio',
    inLanguage: locale,
    url: 'https://www.blokblokstudio.com',
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
      item: `https://www.blokblokstudio.com${item.url}`,
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

export async function ServiceSchema() {
  const t = await getTranslations('seo');
  // Live-site service list, only website design exposed publicly. The
  // remaining services remain in source history for future re-enable.
  const services = [
    {
      name: t('service_name'),
      description: t('service_description'),
    },
  ];

  const schema = services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@type': 'Organization',
      name: 'Blok Blok Studio',
      url: 'https://www.blokblokstudio.com',
    },
    description: service.description,
    areaServed: t('worldwide'),
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

export async function LocalBusinessSchema() {
  const t = await getTranslations('seo');
  const locale = await getLocale();
  const schema = {
    inLanguage: locale,
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': 'https://www.blokblokstudio.com/#organization',
    name: 'Blok Blok Studio',
    alternateName: 'BlokBlok Studio',
    description: t('local_description'),
    image: 'https://www.blokblokstudio.com/logo-hero.png',
    logo: 'https://www.blokblokstudio.com/logo.svg',
    url: 'https://www.blokblokstudio.com',
    foundingDate: '2024-06',
    // Detail from the founder video's transcript (src/data/video-transcripts.ts).
    // It was E-E-A-T signal sitting in an audio file where nothing could read
    // it. Keep the two in agreement if the video is ever re-cut.
    founder: {
      '@type': 'Person',
      name: 'Chase Haynes',
      jobTitle: 'Founder',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Parsons School of Design',
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Bachelor of Fine Arts, Design and Technology',
      },
      birthPlace: { '@type': 'Place', name: 'San Diego, California' },
      homeLocation: { '@type': 'Place', name: 'Berlin, Germany' },
      knowsAbout: [t('knows_1'), t('knows_2'), t('knows_4'), t('knows_3')],
      sameAs: [
        'https://www.linkedin.com/in/chase-haynes/',
        'https://www.instagram.com/itschasehaynes/',
      ],
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
      { '@type': 'Country', name: 'Philippines' },
      { '@type': 'Place', name: t('worldwide') },
    ],
    knowsLanguage: ['English', 'German', 'Spanish', 'French', 'Italian', 'Dutch', 'Portuguese', 'Polish', 'Russian', 'Swedish', 'Turkish', 'Arabic', 'Hindi', 'Indonesian', 'Japanese', 'Korean', 'Thai', 'Vietnamese', 'Chinese'],
    knowsAbout: [t('knows_1'), t('knows_2'), t('knows_3')],
    priceRange: '$$',
    // Everything is quoted in euros. Dollar figures elsewhere on the site
    // are US clients' results, not our prices.
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Credit Card, Bank Transfer, Stripe',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    // Five: founder, creative director (Richmond), marketing (Los Angeles),
    // full stack dev (Berlin), video (Multan). Matches the team page.
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 5 },
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

/**
 * VideoObject markup for the videos the site hosts itself.
 *
 * Crawlers and AI assistants never download an mp4, so an unmarked <video>
 * tag tells them nothing. This is what makes the video eligible for video
 * results and gives an LLM something quotable when someone asks what a
 * client said about us. Metadata comes from src/data/videos.ts so the schema,
 * the sitemap, and /llms.txt cannot drift apart.
 */
export function VideoSchema({ videos }: { videos: SiteVideo[] }) {
  const schema = videos.map((v) => {
    const { contentUrl, thumbnailUrl, captionUrl, pageUrl } = videoUrls(v);
    const transcript = transcriptAsPlainText(v.id as SiteVideoKey);
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      '@id': `${pageUrl}#video-${v.id}`,
      name: v.name,
      description: v.description,
      thumbnailUrl,
      contentUrl,
      uploadDate: v.uploadDate,
      duration: v.duration,
      encodingFormat: 'video/mp4',
      inLanguage: 'en',
      isFamilyFriendly: true,
      // The whole point of the exercise: nothing else on the page tells a
      // crawler or an assistant what is actually said in the video.
      transcript,
      ...(captionUrl ? { caption: captionUrl } : {}),
      // Self-hosted: the page is where it plays, there is no separate player.
      embedUrl: pageUrl,
      publisher: {
        '@type': 'Organization',
        name: 'Blok Blok Studio',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.blokblokstudio.com/logo.png',
        },
      },
    };
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
