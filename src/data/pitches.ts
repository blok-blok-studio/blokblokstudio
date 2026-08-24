/**
 * Post-call pitch pages — one entry per prospect, served at /pitch/<slug>.
 *
 * These exist for the call that did not close on the spot: "let me think
 * about it", "I need to run it past my partner". Instead of a PDF nobody
 * opens on a phone, they get one branded link carrying the recap, the scope,
 * the number and the proof. See docs/pitch-templates.md, Template 5.
 *
 * A pitch is a list of blocks rendered in order, so a two-paragraph follow-up
 * and a full proposal use the same page without either being padded or
 * squeezed. Add a block type here and in PitchContent when a pitch needs
 * something the list does not cover yet.
 *
 * Rules that matter:
 * - The page is noindex and linked from nowhere. It is written for one person
 *   and quotes their numbers, so it must never turn up in a search result.
 * - The slug is the whole lock on the page. Anyone with the link can read it.
 * - Assets live in `public/pitch/<slug>/`, images as WebP with their real
 *   pixel dimensions set, so the page does not jump while it loads.
 * - Delete the entry once the deal closes or dies. This repo is public, so
 *   what goes in here is what you would be comfortable with the prospect,
 *   and their competitors, reading.
 */

export interface PitchLink {
  label: string;
  url: string;
  /** One line on why they are looking at it. */
  note?: string;
}

export interface PitchImage {
  /** Path under public/, e.g. /pitch/acme/homepage.webp */
  src: string;
  alt: string;
  caption?: string;
  /** Real pixel dimensions of the file. */
  width?: number;
  height?: number;
}

export interface PitchVideo {
  /** Path under public/ or any absolute URL. */
  src: string;
  poster?: string;
  title?: string;
  /** Sits under the player. */
  note?: string;
  /** The live site the video is about, so they can go and look for themselves. */
  href?: string;
  linkLabel?: string;
}

export interface PitchProof {
  name: string;
  /** The number, on its own line. e.g. "$50k+ gross in 5 months" */
  result: string;
  body: string;
  href: string;
  linkLabel?: string;
}

/** Prose. `callout` is the one line they should remember from the section. */
export interface PitchTextBlock {
  type: 'text';
  heading?: string;
  kicker?: string;
  paragraphs: string[];
  callout?: string;
}

export interface PitchBulletsBlock {
  type: 'bullets';
  heading?: string;
  kicker?: string;
  intro?: string;
  items: string[];
  note?: string;
}

export interface PitchCardsBlock {
  type: 'cards';
  heading?: string;
  kicker?: string;
  intro?: string;
  items: { title: string; desc: string }[];
}

export interface PitchStatsBlock {
  type: 'stats';
  kicker?: string;
  heading?: string;
  items: { value: string; label: string }[];
  note?: string;
}

export interface PitchVideosBlock {
  type: 'videos';
  kicker?: string;
  heading?: string;
  intro?: string;
  items: PitchVideo[];
}

export interface PitchImagesBlock {
  type: 'images';
  kicker?: string;
  heading?: string;
  intro?: string;
  items: PitchImage[];
}

export interface PitchProofBlock {
  type: 'proof';
  kicker?: string;
  heading?: string;
  intro?: string;
  items: PitchProof[];
}

/** The week-by-week plan. `need` is what we need from them that week. */
export interface PitchTimelineBlock {
  type: 'timeline';
  kicker?: string;
  heading?: string;
  intro?: string;
  rows: { when: string; what: string; need?: string }[];
  note?: string;
}

export interface PitchInvestmentBlock {
  type: 'investment';
  kicker?: string;
  heading?: string;
  /** e.g. "€20,000" */
  price: string;
  priceLabel?: string;
  /** e.g. "6 weeks from kickoff" */
  timeline?: string;
  includes?: string[];
  excludes?: string[];
  /** Plain date the quote holds until, e.g. "September 15, 2026". */
  holdUntil?: string;
  /** Payment schedule, one row per instalment. */
  schedule?: { when: string; what?: string; pay: string }[];
  /** Anything that needs saying under the table. */
  note?: string;
}

export interface PitchLinksBlock {
  type: 'links';
  kicker?: string;
  heading?: string;
  intro?: string;
  items: PitchLink[];
}

export type PitchBlock =
  | PitchTextBlock
  | PitchBulletsBlock
  | PitchCardsBlock
  | PitchStatsBlock
  | PitchVideosBlock
  | PitchImagesBlock
  | PitchProofBlock
  | PitchTimelineBlock
  | PitchInvestmentBlock
  | PitchLinksBlock;

export interface PitchData {
  slug: string;
  /** Business name, shown in the header as "Prepared for ...". */
  business: string;
  /** Who was on the call. First name is fine. */
  contactName: string;
  /** Date of the call or the proposal, plain English. */
  callDate?: string;
  kicker?: string;
  headline: string;
  intro: string;
  blocks: PitchBlock[];
  /** Overrides the standard booking link when a deal has its own thread. */
  calendarUrl?: string;
  /** Last word before the buttons. Keep it short and low pressure. */
  closing?: string;
}

export const PITCH_CONTACT_EMAIL = 'chase@blokblokstudio.com';
export const PITCH_CONTACT_NAME = 'Chase Haynes';
export const PITCH_CALENDAR_URL = 'https://calendar.app.google/HeP9bUhWaKfosQF26';
export const PITCH_WHATSAPP_URL = 'https://wa.me/491627055848';
/** Our own site, offered at the foot of every pitch. Tagged `pitch`, which
 *  lead-capture.ts treats as organic so these never fire an ad pixel. */
export const PITCH_SITE_URL =
  'https://www.blokblokstudio.com/?utm_source=pitch&utm_medium=pitch-page&utm_campaign=post-call';

/**
 * Live pitches, keyed by slug. `example` is the format reference: copy it,
 * rename it, fill it in. It carries no real prospect's information.
 */
export const PITCHES: Record<string, PitchData> = {
  example: {
    slug: 'example',
    business: 'Example Plumbing Co.',
    contactName: 'Sam',
    callDate: 'August 24, 2026',
    kicker: 'Prepared after our call',
    headline: 'What we would build for Example Plumbing',
    intro:
      'Everything we talked through on the call, on one page, so you can take your time with it and send it to anyone else who needs to see it.',
    blocks: [
      {
        type: 'bullets',
        heading: 'What you told me',
        items: [
          'The phone goes quiet from November through February and the work is all repeat customers.',
          'You do not show up on Google for emergency work in your own city.',
          'Every lead comes to a personal inbox and the follow-up happens when you remember it.',
        ],
      },
      {
        type: 'cards',
        heading: 'What we would build',
        items: [
          {
            title: 'New site, built around the searches that pay',
            desc: 'A page for each service people actually search for, written for your area, fast on a phone at the side of the road.',
          },
          {
            title: 'Google Business Profile, cleaned up and worked',
            desc: 'Categories, services, photos and posts, plus a review flow so the star rating keeps climbing instead of sitting still.',
          },
          {
            title: 'Leads into a database, not an inbox',
            desc: 'Every form fill lands somewhere you can see it, with the email captured so you own the list.',
          },
          {
            title: 'Auto-texting so nobody waits',
            desc: 'A new lead gets a text back in seconds, at 2pm or 2am, before they call the next company on the list.',
          },
        ],
      },
      {
        type: 'proof',
        heading: 'Who we have done this for',
        items: [
          {
            name: 'Bronco Plumbing, Dallas-Fort Worth',
            result: '$50k+ gross in the first 5 months',
            body: 'Colton started his company five months before we built his site. Between his plumbing work and the system we built around it he has done over $50,000 gross, at 5.0 stars across 52 Google reviews.',
            href: 'https://www.blokblokstudio.com/projects/bronco-plumbing',
            linkLabel: 'Read the case study',
          },
        ],
      },
      {
        type: 'investment',
        heading: 'The investment',
        price: '$10,000',
        timeline: '4 to 6 weeks from kickoff',
        holdUntil: 'September 15, 2026',
        includes: [
          'Design and build of the full site',
          'Service and location pages, written by us',
          'Google Business Profile setup and first month of posts',
          'Lead database, contact forms and auto-texting',
          'Handover call and 30 days of fixes after launch',
        ],
        excludes: ['Ad spend', 'Photography and video shoots'],
      },
      {
        type: 'links',
        heading: 'Everything else in one place',
        items: [
          {
            label: 'How we work, in about 3 minutes',
            url: 'https://www.blokblokstudio.com/start?utm_source=warm-email&utm_medium=email&utm_campaign=post-call',
            note: 'The page to send to a partner or a spouse who was not on the call.',
          },
        ],
      },
    ],
    closing:
      'No rush on this. If you want anything priced differently or pulled out of scope, say the word and I will send a revised version.',
  },

  /**
   * Maison Arca (Denim Pro SPRL, Belgium) — PrestaShop to Shopify rebuild,
   * quoted 24 August 2026. Page version of Maison-Arca-Proposal-BlokBlok_1.pdf.
   */
  'maison-arca': {
    slug: 'maison-arca',
    business: 'Maison Arca',
    contactName: 'Maher',
    callDate: '24 August 2026',
    kicker: 'Proposal for Maher Braham, Denim Pro SPRL',
    headline: 'Maison Arca on Shopify',
    intro:
      'You want to be on Shopify quickly, with the problems fixed, so the influencer platform can send traffic to a store that works. That is what this does.',
    blocks: [
      {
        type: 'stats',
        items: [
          { value: '6 weeks', label: 'Kickoff to live. Eight weeks held as the outside date so nobody is guessing.' },
          { value: '€20,000', label: 'Total for the build. A quarter at kickoff, the rest across six months.' },
          { value: '21 products', label: 'Rewritten in English and French, with around 100 images and 21 videos.' },
        ],
      },
      {
        type: 'text',
        kicker: 'The honest answer',
        heading: 'Moving the store does not fix the store',
        paragraphs: [
          'You asked, fairly, whether this is a migration or a new website. It is worth answering first, because it is the whole difference between two very different prices.',
          'A migration moves your products, your pages and your customers from PrestaShop to Shopify. It solves the platform. Shopify connects to your fulfilment partner in Belgium without anyone building a module. It connects to the influencer platform. It has an app. Those problems go away on their own.',
          'What a migration does not solve is what is inside the store. The size guide that does not open. The colours that switch off together when you take one out of stock. The item that shows sold out when it is not. The English pages sending French text to Google. The jean whose French description is actually about a corset. None of those are caused by PrestaShop. They live in the content and the configuration, and a migration copies them across exactly as they are.',
          'There is a second reason to do it properly now. You are about to open a channel with five hundred influencers. That traffic is expensive attention with a short life. It arrives once, on a phone, from someone who has never heard of Maison Arca. If it lands on a store with no reviews, no fit information, no way to filter by size, and a basket that sometimes reports sold out on a piece you have in stock, you have paid for the visit and lost the order. Doing this twice costs more than doing it once.',
        ],
        callout:
          'We are not charging you to move files. We are charging you to rebuild what gets moved.',
      },
      {
        type: 'bullets',
        kicker: 'What we found',
        heading: 'The things you already know about',
        intro: 'Some of this you told us. The rest we found ourselves, before the call, by going through maisonarca.com page by page.',
        items: [
          'Mobile. Most of your traffic is on a phone and the phone experience is the weakest one you have.',
          'Colour variants are linked. Taking one colourway out of stock takes them all out. On Shopify these are separate options on one product and behave independently.',
          'Sold out on items that are in stock. You can see the rage clicks in Clarity. People are trying to buy and being turned away.',
          'The size guide does not open on the Caroline jean. It works on Monica, so the feature exists and was never connected on your best seller.',
          'Videos lag. They sit on Vimeo and load from there. Shopify hosts video natively, compressed, on the same network as the page.',
          'French text on English pages, which you have been fixing by hand.',
        ],
      },
      {
        type: 'bullets',
        heading: 'The things you cannot see from the front of the site',
        items: [
          'Every English page sends Google a French title and description. The English URLs use French words too, so an English customer lands on /9-robes and /2-tous-les-produits. Your main language is invisible to search in its own language.',
          'The French Caroline page describes the Aurora corset top. Someone reading about a €89.99 jean is being told about a bustier.',
          'The same jean is 100% cotton in English and cotton with elastane in French. English calls the cut barrel leg, French calls it tapered.',
          'Six of your eight policy pages are hidden from Google, including the FAQ. Seventeen questions about sizing, shipping, returns and denim care that nobody can find.',
          'Your sitemap lists twelve products. Capri, Santorini, Serena, Elena and Freya are live and missing from it. It was last updated on 28 July.',
          'The All Products page hides seven live products. Monica, Jennie, Diva, Hailey, Aurora, Freya and Elena do not appear on either page of it.',
          'Your cookie banner has one button, Got it. Your own cookie policy tells visitors they can decline and change their settings later. Neither option exists, which is a real exposure for a Belgian company.',
          'Photography is served straight from the camera, at full size, in formats that slow every page down.',
        ],
      },
      {
        type: 'bullets',
        heading: 'What is missing entirely',
        items: [
          'Customer reviews. Nothing on the site says another person bought this and was happy.',
          'Model and fit information. No height, no size worn, no fit notes. This is the biggest cause of returns in denim sold online.',
          'Filters. A customer cannot narrow by size, colour, cut or price. Wide leg, baggy, bootcut and barrel exist as separate menu items, which is not how people shop for jeans.',
          'Bancontact. A Belgian company without the payment method Belgians reach for first.',
          'Back in stock alerts. Baggy Arca and Aurora are out of stock today and everyone who wanted them has left without a way of being told.',
          'An email programme. One unlabelled box in the footer, no reason to sign up, no consent tick, and nothing sent afterwards.',
        ],
        note: 'None of this is a comment on the brand. The photography is good, the positioning is clear, and one workshop with thirty years behind it is the strongest thing you have. What is not working is the layer between that brand and the person trying to buy from it.',
      },
      {
        type: 'cards',
        kicker: 'Everything included',
        heading: 'What we build',
        intro: 'Twenty one products, roughly one hundred images and twenty one videos, in English and French, on Shopify, using the brand guidelines you already have.',
        items: [
          {
            title: 'Setup and architecture',
            desc: 'Store settings, currencies, markets, taxes, shipping zones and rates, staff access. Your catalogue restructured so colourways sit as options on one product rather than separate products wired together, which is what causes them to switch off as a group today.',
          },
          {
            title: 'Design',
            desc: 'Built to your existing brand guidelines: your typography, your palette, your logo, applied consistently to every button, heading and state. Home, collection, product, basket, search, account, policy pages and the 404. Mobile first, checked on real phones.',
          },
          {
            title: 'Product data, rewritten',
            desc: 'All twenty one products written again in English and French, checked line by line against each other. Correct composition, cut and care on every piece. Model and fit notes. A size chart mapped per category and connected on every product, not just some.',
          },
          {
            title: 'Images and video',
            desc: 'Around one hundred images cropped to consistent ratios, renamed, described for accessibility and search, and converted to modern compressed formats. Your logo delivered as SVG. All twenty one videos moved off Vimeo and hosted natively on Shopify.',
          },
          {
            title: 'Built to sell',
            desc: 'Reviews collected automatically after delivery. Filters by size, colour, cut and price. Back in stock alerts. A basket drawer with a free shipping goal. Delivery, returns and payment reassurance placed where the customer is deciding.',
          },
          {
            title: 'Payments and checkout',
            desc: 'Bancontact, iDEAL, cards, PayPal, Apple Pay and Google Pay. Shipping profiles and rates per market. Belgian VAT and OSS set correctly. Real test orders pushed through every payment method before launch.',
          },
          {
            title: 'Languages and markets',
            desc: 'English as your primary language, French as a full second version, separated properly through Shopify Markets rather than patched. Euro and dirham handled natively. Search engines told which version belongs to which audience.',
          },
          {
            title: 'Migration',
            desc: 'Products, collections, content pages and customer accounts moved across. Customers reimported with a password reset at launch, because password files cannot legally or technically transfer between platforms. Your Hostinger domain pointed at Shopify with no downtime.',
          },
          {
            title: 'Index mapping',
            desc: 'Every address Google currently knows about, pulled from Search Console and your sitemaps, mapped to its new home on Shopify and tested before launch. This is the single most common way a store loses traffic when it moves, and it is entirely preventable.',
          },
          {
            title: 'Search',
            desc: 'Titles and descriptions written in the correct language for each market. Alt text on every image. Structured data on every product. Clean heading structure and internal linking. Your policy and FAQ pages made visible to Google again, and a clean sitemap submitted on launch day.',
          },
          {
            title: 'AI search',
            desc: 'People increasingly ask ChatGPT, Perplexity, Claude or Google’s AI answers for a recommendation before they open a search page. We publish your product facts in a form those systems can parse, and record how they describe Maison Arca today so there is a baseline to improve against.',
          },
          {
            title: 'Domain, DNS and email',
            desc: 'Domain and certificate configured, with SPF, DKIM and DMARC set so your order confirmations and newsletters arrive in inboxes. Order, shipping and refund notifications rebuilt on your brand and working in both languages.',
          },
          {
            title: 'Newsletter and automated emails',
            desc: 'A signup worth using, with a welcome offer, proper consent and confirmation by email, and your list segmented from the start. Three sequences running from launch: welcome, abandoned basket, and back in stock. Both languages, tested end to end.',
          },
          {
            title: 'Analytics and tracking',
            desc: 'Google Analytics, Meta Pixel and Clarity carried across, reconnected and tested against real events. Meta’s Conversions API added so tracking survives ad blockers. Consent handled correctly for Belgium. Campaign tagging so influencer traffic can be told apart, and a product feed prepared for Google and Meta.',
          },
          {
            title: 'Influencer platform readiness',
            desc: 'The store set up so the platform you are joining can connect to it cleanly, with attribution working from day one, so you can see which creator brought which order rather than guessing.',
          },
          {
            title: 'Fulfilment',
            desc: 'Your Belgian fulfilment partner connected to Shopify, with order and tracking flow tested. No custom module, because Shopify does not need one.',
          },
          {
            title: 'Menswear, ready and hidden',
            desc: 'The men’s category built, structured and styled now, held offline. When the collection is ready you make it visible and it is live. No new build, no waiting on us.',
          },
          {
            title: 'Compliance',
            desc: 'A cookie banner that genuinely lets people decline and change their mind, a cookie policy that describes what the site actually does, and your company name, address and VAT number where European rules expect to find them.',
          },
          {
            title: 'Testing and launch',
            desc: 'Checked across browsers and on real devices from large monitors down to older Android phones. Redirects verified. Speed measured against a target rather than hoped for. A launch plan with a way back if anything goes wrong.',
          },
          {
            title: 'Handover and training',
            desc: 'Every account in your name from the first day. Short videos showing you how to add a product, run a collection drop and edit a page, plus written notes. Thirty days of cover after launch, then the free service months below.',
          },
        ],
      },
      {
        type: 'timeline',
        kicker: 'How we work',
        heading: 'You see it every week',
        intro: 'We meet weekly during the build. You see progress, you approve each stage, and you know what is happening before it happens. There is no long silence followed by a reveal.',
        rows: [
          {
            when: 'Week 1',
            what: 'Kickoff, access to accounts, catalogue and navigation planned, design direction agreed.',
            need: 'You: brand guidelines, logins, product files',
          },
          {
            when: 'Weeks 2 to 3',
            what: 'Store built to your guidelines, every page designed and assembled.',
            need: 'You: approve the design',
          },
          {
            when: 'Weeks 3 to 4',
            what: 'Products rewritten in both languages, images and video processed and loaded.',
            need: 'You: answer questions on fit and fabric',
          },
          {
            when: 'Week 5',
            what: 'Payments, markets, fulfilment, email, tracking and compliance.',
            need: 'You: nothing',
          },
          {
            when: 'Week 6',
            what: 'You review the whole store on a private link, then redirects, launch and training.',
            need: 'You: approve and go live',
          },
        ],
        note: 'Six weeks assumes we get files and answers promptly. We hold eight weeks as the outside date so nobody is guessing.',
      },
      {
        type: 'bullets',
        kicker: 'Afterwards',
        heading: 'Four months on us, then we keep running it',
        intro: 'A store is not finished at launch. Products change, platforms update, and what we set up in week six starts drifting by month three if nobody watches it. So we stay. From launch until month seven you pay nothing for this, roughly four months included while you are still paying off the build.',
        items: [
          'New pieces and collection drops. Written in both languages, images processed, sized, tagged, placed and scheduled. Including the menswear launch when you are ready.',
          'Any change to the live store. Copy, images, layout, seasonal updates, banners, new collection pages, new sections. Only a complete redesign sits outside this.',
          'Behind the scenes. Shopify settings, checkout, shipping, tax, inventory rules, permissions, apps kept current and replaced when they break.',
          'Domain and email. Records and deliverability kept correct so confirmations keep reaching inboxes.',
          'Search. Descriptions for every new product, redirects maintained as things change, sitemap kept accurate, and monitoring of how AI assistants describe you.',
          'Selling better. Each month we look at what customers actually did and improve one thing because of it, then tell you whether it worked.',
          'Us. My phone number, not a ticket system. Anything urgent, any hour. Everything else the same working day. A written report and a call every month.',
        ],
        note: 'What this is not: we do not run your marketing. No advertising, no campaign management, no influencer outreach, no social posting. We build and maintain everything your marketing runs on, so that you, your data analyst, or whoever you hire is never fighting the website to do their job.',
      },
      {
        type: 'images',
        kicker: 'Before you look at the number',
        heading: 'We have done this before',
        intro: 'Exotic Ripz is a Shopify store we built and ran. Between April and October 2025 it took $191,042 across 1,790 orders. This is a screenshot of that store’s own Shopify dashboard, not a case study we wrote about ourselves.',
        items: [
          {
            src: '/pitch/maison-arca/exotic-ripz-shopify.webp',
            alt: 'Shopify admin for Exotic Ripz showing $191,042.1 in total sales and 1.79K orders between 1 April and 31 October 2025.',
            caption: 'Shopify admin, Exotic Ripz. 1 April to 31 October 2025.',
            width: 1292,
            height: 1090,
          },
        ],
      },
      {
        type: 'stats',
        items: [
          { value: '$191,042', label: 'Total sales, April to October 2025' },
          { value: '1,790', label: 'Orders in the same period' },
          { value: '7 months', label: 'From launch to that figure' },
        ],
      },
      {
        type: 'videos',
        heading: 'Two of our clients, in their own words',
        intro: 'Both filmed at their own places of work, unscripted.',
        items: [
          {
            src: '/videos/testimonial-luki-v2.mp4',
            poster: '/videos/testimonial-luki-v2-poster.webp',
            title: 'Coach Luki, Berlin',
            note: 'Bookings and payments taken straight through the site. No messages, no invoices.',
            href: 'https://coachluki.com/',
            linkLabel: 'coachluki.com',
          },
          {
            src: '/videos/testimonial-kofi-v2.mp4',
            poster: '/videos/testimonial-kofi-v2-poster.webp',
            title: 'Coach Kofi, Berlin',
            note: 'Consultation requests up 200% after launch.',
            href: 'https://www.coachkofi.de/',
            linkLabel: 'coachkofi.de',
          },
        ],
      },
      {
        type: 'proof',
        heading: 'Other recent work',
        intro: 'Every one of these is live. Click any of them and look around.',
        items: [
          {
            name: 'Exotic Ripz',
            result: '$191,042 across 1,790 orders',
            body: 'Shopify store for trading cards, built and run by us, including the shipping setup on the back end. The owners took the store over and later closed it, so the case study is the best place to see the work.',
            href: 'https://www.blokblokstudio.com/projects/exotic-ripz',
            linkLabel: 'blokblokstudio.com/projects/exotic-ripz',
          },
          {
            name: 'Coach Kofi',
            result: 'Consultation requests up 200% after launch',
            body: 'A Nike athlete and personal trainer in Berlin. Site, booking flow and the content around it.',
            href: 'https://www.coachkofi.de/',
            linkLabel: 'coachkofi.de',
          },
          {
            name: 'Coach Luki',
            result: 'Bookings and payments taken straight through the site',
            body: 'No back and forth in messages, no invoices written by hand. The site does the admin.',
            href: 'https://coachluki.com/',
            linkLabel: 'coachluki.com',
          },
          {
            name: 'Bronco Plumbing',
            result: '$50k gross revenue in the first five months',
            body: 'A Dallas plumber five months into his own company, at 5.0 stars across 52 Google reviews.',
            href: 'https://www.broncoplumbingdfw.com/',
            linkLabel: 'broncoplumbingdfw.com',
          },
        ],
      },
      {
        type: 'investment',
        kicker: 'Investment',
        heading: 'What it costs',
        price: '€20,000',
        priceLabel: 'Total for the build. €5,000 deposit to start, then €2,500 a month for six months.',
        timeline: '6 weeks from kickoff',
        schedule: [
          { when: 'On signing', what: 'Kickoff booked, work begins', pay: '€5,000' },
          { when: 'Month 1', what: 'Design approved, build underway', pay: '€2,500' },
          { when: 'Month 2', what: 'Store live. Ongoing service starts, free', pay: '€2,500' },
          { when: 'Month 3', what: 'Live and being looked after', pay: '€2,500' },
          { when: 'Month 4', pay: '€2,500' },
          { when: 'Month 5', pay: '€2,500' },
          { when: 'Month 6', what: 'Build paid in full', pay: '€2,500' },
          { when: 'Month 7 on', what: 'Ongoing service begins', pay: '€1,500' },
        ],
        excludes: [
          'advertising and campaign management',
          'photography and video production',
          'a brand redesign, which you do not need',
          'a wholesale portal, subscriptions or custom applications',
          'connections to accounting or warehouse systems beyond your existing fulfilment partner',
        ],
        note: 'Most studios ask for half up front and half on launch. We do not, because you have already paid a large amount once and have little to show for it. A quarter at kickoff and the rest spread across six months means you are never writing a large cheque, and we are earning the balance while you watch us work.',
      },
      {
        type: 'text',
        heading: '€18,000 with one introduction',
        paragraphs: [
          'Introduce us to one business in your network that goes on to work with us, and we take €2,000 off, credited against your final payments. Given your family has been in textiles for thirty years, we suspect that is not a difficult thing for you to do.',
          'The monthly service is €1,500, starting in month seven once the build is paid off. Six months, then month to month with thirty days’ notice on either side. We are not going to tie you into a year. If we are not worth it you should be able to leave, and if we have done our job you will not want to.',
          'What you own: your domain, your Shopify account, your apps and every file we produce are yours from the first day, in your name, on your own logins. Your Shopify plan and any app subscriptions are billed to you directly, so nothing runs through us and nothing can be held over you. If you decided to stop after seeing the finished store, you would keep the work.',
        ],
      },
    ],
    closing:
      'If this reads right, we book the kickoff and take the deposit. Six weeks later your store is live on Shopify, your products say the same thing in both languages, your videos play, your colours behave, your checkout works, and the influencer platform has somewhere worth sending people. If something here is wrong or missing, tell me. I would rather redraw it now than build the wrong thing.',
  },
};

export const PITCH_SLUGS = Object.keys(PITCHES);
