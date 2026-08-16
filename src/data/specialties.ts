/**
 * ============================================================================
 * specialties.ts — Commercial landing pages ("who we build for")
 * ============================================================================
 * Data for the keyword-targeted specialty pages:
 *   /webdesign-berlin                  (German-language, local SEO)
 *   /plumber-website-design            (trades and home services, Bronco proof)
 *   /personal-trainer-website-design   (coaches and trainers, Luki/Kofi proof)
 *   /ecommerce-website-design          (stores, Exotic Ripz proof)
 *
 * Rendered by SpecialtyContent.tsx; each page.tsx under (main)/<slug> builds
 * its metadata and FAQ structured data from this file. English-only content
 * (like the blog) except webdesign-berlin, which is authored in German for
 * the audience that searches in German. Every number cited here is a real
 * client result. House copy rule: no em dashes.
 * ============================================================================
 */

export interface SpecialtyFaq {
  q: string;
  a: string;
}

export interface SpecialtyData {
  slug: string;
  /** BCP 47 language of the page content */
  lang: 'en' | 'de';
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  intro: string;
  stats: { value: string; label: string }[];
  featuresHeading: string;
  features: { title: string; desc: string }[];
  caseStudy: {
    heading: string;
    name: string;
    result: string;
    body: string;
    href: string;
    linkLabel: string;
  };
  faqHeading: string;
  faqs: SpecialtyFaq[];
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  ctaHref: string;
}

export const specialties: Record<string, SpecialtyData> = {
  'webdesign-berlin': {
    slug: 'webdesign-berlin',
    lang: 'de',
    metaTitle: 'Webdesign Berlin | Blok Blok Studio',
    metaDescription:
      'Webdesign Agentur in Berlin. Individuelle Next.js Websites, die Kunden gewinnen. Keine Templates, keine Baukaesten. Kostenloses Erstgespraech.',
    kicker: 'Webdesign Agentur Berlin',
    h1: 'Webdesign aus Berlin, das Kunden bringt',
    intro:
      'Wir entwerfen und entwickeln individuelle Websites fuer Unternehmen in Berlin und weltweit. Jede Seite wird von Grund auf gebaut: schnell, suchmaschinenoptimiert und auf ein Ziel ausgerichtet, nämlich aus Besuchern Kunden zu machen.',
    stats: [
      { value: '15+', label: 'Projekte umgesetzt' },
      { value: '100%', label: 'Individuell entwickelt, keine Templates' },
      { value: '2', label: 'Berliner Coaches mit laufenden Buchungen ueber ihre Website' },
    ],
    featuresHeading: 'Was Sie bekommen',
    features: [
      {
        title: 'Individuelles Design, kein Baukasten',
        desc: 'Jede Website wird in Next.js von Hand entwickelt. Das bedeutet: bessere Ladezeiten, besseres Google-Ranking und ein Design, das kein zweites Mal existiert.',
      },
      {
        title: 'SEO ab dem ersten Tag',
        desc: 'Saubere Struktur, lokale Suchbegriffe, strukturierte Daten und Performance-Werte, die Google belohnt. Ihre Website soll gefunden werden, nicht nur gut aussehen.',
      },
      {
        title: 'Buchungen und Zahlungen direkt auf der Seite',
        desc: 'Terminbuchung, Stripe-Zahlungen, Kontaktformulare mit sofortiger Benachrichtigung. Ihre Website arbeitet, auch wenn Sie es nicht tun.',
      },
      {
        title: 'Sichtbar in der KI-Suche (AEO)',
        desc: 'Immer mehr Kunden fragen ChatGPT, Perplexity oder die Google KI-Uebersicht statt klassisch zu googeln. Wir bauen strukturierte Daten, Antwortformate und llms.txt ein, damit Ihre Website in KI-Antworten zitiert wird.',
      },
      {
        title: 'Betreuung aus Berlin',
        desc: 'Direkter Kontakt, schnelle Antworten, persoenliche Uebergabe. Kein Ticketsystem, keine Agentur-Warteschleife.',
      },
    ],
    caseStudy: {
      heading: 'Aus der Praxis',
      name: 'Coach Luki, Personal Trainer in Berlin',
      result: 'Buchungen und Zahlungen laufen komplett ueber die Website',
      body: 'Luke Satterly trainiert Klienten bei Holmes Place und John Reed. Seine Website nimmt Buchungen an und wickelt Zahlungen ueber Stripe ab, ohne Direktnachrichten und ohne Rechnungen per Hand. Dazu lokale Suchmaschinenoptimierung fuer Begriffe wie "Personal Trainer Berlin".',
      href: '/projects/coach-luki',
      linkLabel: 'Zur Fallstudie',
    },
    faqHeading: 'Haeufige Fragen',
    faqs: [
      {
        q: 'Was kostet eine Website bei Blok Blok Studio?',
        a: 'Jedes Projekt wird individuell kalkuliert, abhaengig von Umfang und Funktionen. Nach einem kostenlosen Erstgespraech erhalten Sie ein Festpreisangebot mit klar definierten Leistungen. Eine Uebersicht finden Sie auf unserer Preisseite.',
      },
      {
        q: 'Wie lange dauert die Entwicklung?',
        a: 'Eine typische Unternehmenswebsite ist in 2 bis 4 Wochen live. Groessere Projekte mit Buchungssystem oder Shop dauern entsprechend laenger. Den genauen Zeitplan legen wir vor Projektstart fest.',
      },
      {
        q: 'Arbeiten Sie nur mit Berliner Unternehmen?',
        a: 'Nein. Wir sitzen in Berlin und betreuen Kunden vor Ort persoenlich, arbeiten aber mit Unternehmen weltweit, unter anderem in den USA.',
      },
      {
        q: 'Warum keine KI-Website oder ein Baukasten wie Wix?',
        a: 'KI-Baukaesten liefern in Minuten eine Website, die aussieht wie tausend andere, langsam laedt und weder in Google noch in der KI-Suche zuverlaessig gefunden wird. Eine individuell entwickelte Website kostet mehr, gewinnt dafuer aber messbar Kunden. Unsere Fallstudien zeigen die Zahlen.',
      },
      {
        q: 'Warum Next.js statt WordPress oder Wix?',
        a: 'Next.js Websites laden schneller, sind sicherer und ranken besser, weil kein Ballast aus Plugins und Themes mitgeliefert wird. Sie bekommen genau das, was Ihr Unternehmen braucht, und nichts, was es ausbremst.',
      },
    ],
    ctaHeading: 'Lassen Sie uns ueber Ihr Projekt sprechen',
    ctaBody: 'Kostenloses Erstgespraech, 15 Minuten. Sie erzaehlen uns, was Sie brauchen, wir sagen Ihnen ehrlich, wie wir es umsetzen wuerden.',
    ctaButton: 'Kostenloses Erstgespraech buchen',
    ctaHref: '/contact',
  },

  'plumber-website-design': {
    slug: 'plumber-website-design',
    lang: 'en',
    metaTitle: 'Plumber Website Design | Blok Blok Studio',
    metaDescription:
      'Websites for plumbers and home service companies that turn Google and AI searches into booked jobs. Our first-year plumbing client generated $50k with his site.',
    kicker: 'Trades and Home Services',
    h1: 'Websites for plumbers that turn searches into booked jobs',
    intro:
      'When a homeowner has a burst pipe, they search, call the first trustworthy result, and never scroll back. We build websites for plumbers and home service companies that win that moment: fast, local-SEO ready, and built around the call button.',
    stats: [
      { value: '$50k', label: 'Revenue generated by our plumbing client in his first 5 months' },
      { value: '5.0', label: 'Star rating across 52 Google reviews, pulled live into the site' },
      { value: '8,000+', label: 'Google search impressions in the first 3 months of tracking' },
    ],
    featuresHeading: 'What a trades site needs to actually produce jobs',
    features: [
      {
        title: 'A sticky call bar on mobile',
        desc: 'Most emergency searches happen on a phone. The number stays on screen the whole time, so the moment a homeowner decides, they tap once and the phone rings.',
      },
      {
        title: 'Local SEO built in from day one',
        desc: 'Service pages per job type, city targeting, review schema, and Google Business Profile alignment. The goal is simple: show up when your area searches "plumber near me".',
      },
      {
        title: 'Real reviews, pulled in live',
        desc: 'Your Google reviews display automatically on the site. Fresh proof without you touching anything, and the same trust signals Google rewards.',
      },
      {
        title: 'Visible in AI search, not just Google',
        desc: 'Homeowners increasingly ask ChatGPT and Google AI Overviews "who is the best plumber near me". We build the structured data and answer-first content (AEO) that gets your business cited in those AI answers.',
      },
      {
        title: 'Leads straight into your workflow',
        desc: 'Estimate requests and contact submissions land in your inbox and your job pipeline instantly. Speed to lead wins the job in the trades.',
      },
    ],
    caseStudy: {
      heading: 'Case study',
      name: 'Bronco Plumbing, Dallas-Fort Worth',
      result: '$50,000 gross revenue in the first 5 months of business',
      body: 'Colton Staley launched Bronco Plumbing with no website and no online presence. We built a conversion-focused site around him: owner on every call, honest estimates, live Google reviews, and a sticky call bar for mid-emergency searches. The site ranks at an average position of 5.2 for its search terms.',
      href: '/projects/bronco-plumbing',
      linkLabel: 'Read the full case study',
    },
    faqHeading: 'Common questions',
    faqs: [
      {
        q: 'How much does a plumber website cost?',
        a: 'Every build is quoted to scope after a free 15-minute call. You get a fixed price with defined deliverables before we start. See our pricing page for how engagements are structured.',
      },
      {
        q: 'How long until the site starts producing leads?',
        a: 'The site itself is typically live in 2 to 4 weeks. Local SEO compounds over the following months; our plumbing client logged 8,000+ search impressions within his first 3 months of tracking.',
      },
      {
        q: 'Do you work with other trades besides plumbing?',
        a: 'Yes. The same playbook works for electricians, HVAC, roofing, and any home service business where customers search locally and call: local SEO, live reviews, and a site built around the phone call.',
      },
      {
        q: 'Why not just use an AI website builder?',
        a: 'AI builders produce a generic site in minutes, but they cannot do the things that book plumbing jobs: local SEO per service area, live Google reviews, a call-first mobile layout, and leads wired into your workflow. Our plumbing client generated $50k in 5 months with a site built for his market, not from a template.',
      },
      {
        q: 'Can you connect the site to my existing tools?',
        a: 'Yes. Lead forms can feed your CRM, job management software, or a simple pipeline we set up for you. Our Bronco build feeds leads directly into the owner\'s job workflow.',
      },
    ],
    ctaHeading: 'Want a site that books jobs?',
    ctaBody: 'Free 15-minute call. Tell us about your service area and we will tell you exactly what we would build.',
    ctaButton: 'Book a free call',
    ctaHref: '/contact',
  },

  'personal-trainer-website-design': {
    slug: 'personal-trainer-website-design',
    lang: 'en',
    metaTitle: 'Personal Trainer Website Design | Blok Blok Studio',
    metaDescription:
      'Websites for personal trainers and coaches with booking and payments built in. Our clients book and get paid directly through their sites. See real examples.',
    kicker: 'Coaches and Trainers',
    h1: 'Personal trainer websites that book clients while you train',
    intro:
      'Chasing leads through DMs and sending invoices by hand caps how many clients you can take. We build websites for personal trainers and coaches where visitors book sessions and pay directly on the site, so your calendar fills itself.',
    stats: [
      { value: '200%', label: 'Increase in consultation requests after launch (Coach Kofi)' },
      { value: '0', label: 'Invoices sent by hand since launch, payments run through Stripe (Coach Luki)' },
      { value: '2', label: 'Berlin coaches whose booking runs entirely through their sites' },
    ],
    featuresHeading: 'What a coaching site needs to convert',
    features: [
      {
        title: 'Booking and payments on the site',
        desc: 'Clients pick a slot and pay in one flow through Stripe. No DM back-and-forth, no chasing payments, no no-shows from unconfirmed bookings.',
      },
      {
        title: 'A page that sells your method',
        desc: 'Your philosophy, your results, your proof, structured so a visitor understands what you do in seconds and books before they leave.',
      },
      {
        title: 'Local SEO for your city',
        desc: 'When someone searches "personal trainer" plus your city, you want to be the answer. We build the local targeting in from day one.',
      },
      {
        title: 'Found in AI search (AEO)',
        desc: 'Prospects now ask ChatGPT and Perplexity for trainer recommendations. Structured data, answer-first FAQs, and llms.txt make your site citable by AI search engines, not just rankable on Google.',
      },
      {
        title: 'Social proof that compounds',
        desc: 'Client counts, transformation results, video testimonials. Real numbers on the page do the selling you should not have to do in the DMs.',
      },
    ],
    caseStudy: {
      heading: 'Case study',
      name: 'Coach Luki, Berlin',
      result: 'Bookings and payments run straight through the site',
      body: '"They built my entire site from scratch and now clients book and pay directly through it. I used to waste hours on DMs and invoices." Luke Satterly trains clients at Holmes Place and John Reed in Berlin. His site handles booking, Stripe payments, and local SEO for searches like "personal trainer Berlin".',
      href: '/projects/coach-luki',
      linkLabel: 'Read the full case study',
    },
    faqHeading: 'Common questions',
    faqs: [
      {
        q: 'How much does a personal trainer website cost?',
        a: 'Every build is quoted to scope after a free 15-minute call, with a fixed price and defined deliverables before we start. See our pricing page for how engagements are structured.',
      },
      {
        q: 'Can clients really pay through the site?',
        a: 'Yes. We integrate Stripe so clients purchase session packages directly. Money lands in your account, receipts go out automatically, and you never send an invoice by hand.',
      },
      {
        q: 'I get most clients from Instagram. Do I still need a website?',
        a: 'Instagram builds attention; the website converts it. A link in bio that lands on a page with proof, pricing, and instant booking closes clients that DMs lose. Coach Kofi\'s consultation requests went up over 200% after launch.',
      },
      {
        q: 'Why not just use an AI website builder?',
        a: 'An AI builder can describe your coaching. It cannot take a booking, process a Stripe payment, or rank for "personal trainer" in your city. The site pays for itself when it books clients while you train, and that takes real engineering, not a generated template.',
      },
      {
        q: 'Do you only work with fitness coaches?',
        a: 'No. The same structure works for any coach or consultant who books sessions: nutrition, performance, business coaching. If your business runs on booked calls, this is the playbook.',
      },
    ],
    ctaHeading: 'Ready to fill your calendar?',
    ctaBody: 'Free 15-minute call. Tell us how you get clients today and we will show you what the site should do.',
    ctaButton: 'Book a free call',
    ctaHref: '/contact',
  },

  'ecommerce-website-design': {
    slug: 'ecommerce-website-design',
    lang: 'en',
    metaTitle: 'E-Commerce Website Design | Blok Blok Studio',
    metaDescription:
      'E-commerce and Shopify store design that sells. We built a trading card store that did $191k across 1,790 orders. Conversion-first, AI-search ready storefronts.',
    kicker: 'E-Commerce and Shopify',
    h1: 'E-commerce stores built to sell, not just to exist',
    intro:
      'A store is not a catalog. Every choice, from the product grid to the checkout to the email capture, either moves a visitor toward buying or loses them. We design and build e-commerce storefronts where the numbers prove the design.',
    stats: [
      { value: '$191k', label: 'Sales on the trading card store we built and shipped' },
      { value: '1,790', label: 'Orders through that storefront' },
      { value: '400%', label: 'Email list growth in the first month from smart capture' },
    ],
    featuresHeading: 'What converts in e-commerce',
    features: [
      {
        title: 'Conversion-first storefront design',
        desc: 'Product pages built around the buy decision: clear pricing, urgency where it is honest, and a checkout with nothing in the way.',
      },
      {
        title: 'Email capture that actually grows the list',
        desc: 'Discount-for-email capture placed where it converts. Our client\'s list grew 400% in the first month, and email is the channel you own.',
      },
      {
        title: 'Drops, restocks, and community',
        desc: 'Product drops that sell out need countdowns, notify-me flows, and community integration (Discord, socials) wired into the store, not bolted on.',
      },
      {
        title: 'AI-search and answer-engine ready',
        desc: 'Shoppers ask AI assistants what to buy before they ever hit Google. Product schema, clean feeds, and answer-first content (AEO) make your products citable in ChatGPT, Perplexity, and Google AI Overviews.',
      },
      {
        title: 'Shopify or fully custom',
        desc: 'We build on Shopify when it fits and fully custom in Next.js when it does not. The decision comes from your catalog and margins, not our preferences.',
      },
    ],
    caseStudy: {
      heading: 'Case study',
      name: 'Exotic Ripz, collectible trading cards',
      result: '$191,042 in sales across 1,790 orders',
      body: 'A full Shopify storefront for a trading card community brand: bold animated branding, Discord and multi-platform social integration, smart product categorization, and conversion-optimized email capture. Booster pack drops consistently sold out within hours of release, and the shipping backend was configured end to end.',
      href: '/projects/exotic-ripz',
      linkLabel: 'Read the full case study',
    },
    faqHeading: 'Common questions',
    faqs: [
      {
        q: 'Do you build on Shopify or custom?',
        a: 'Both. Shopify is right for most product businesses; fully custom Next.js storefronts make sense for unusual catalogs, subscriptions, or when platform fees outgrow the convenience. We recommend based on your numbers.',
      },
      {
        q: 'How much does an e-commerce site cost?',
        a: 'Quoted to scope after a free 15-minute call, with a fixed price and defined deliverables before we start. Store size, integrations, and migration needs drive the number.',
      },
      {
        q: 'Can you migrate my existing store?',
        a: 'Yes. Products, customers, and order history can be migrated from most platforms. We plan the migration so the store never goes dark during the switch.',
      },
      {
        q: 'Why not just use an AI store builder?',
        a: 'Generated stores look fine and convert poorly, because conversion lives in the details: capture placement, drop mechanics, checkout friction, product schema for AI search. The $191k store we built sold out drops in hours because every one of those details was engineered, not generated.',
      },
      {
        q: 'Do you set up shipping and payments too?',
        a: 'Yes. The Exotic Ripz build included the shipping backend configured end to end, plus payments, taxes, and the operational pieces most designers leave to you.',
      },
    ],
    ctaHeading: 'Want a store that sells?',
    ctaBody: 'Free 15-minute call. Bring your numbers and we will tell you where the store is leaking revenue.',
    ctaButton: 'Book a free call',
    ctaHref: '/contact',
  },
};

export function getAllSpecialtySlugs(): string[] {
  return Object.keys(specialties);
}
