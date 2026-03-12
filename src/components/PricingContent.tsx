'use client';

import { useState } from 'react';

/* ──────────────────────────────────────────────────────────────
 * Color tokens (inline — matches the brand orange system)
 * ────────────────────────────────────────────────────────────── */
const O = '#F97316';
const OL = '#FB923C';
const OD = '#EA580C';
const OG = 'rgba(249,115,22,0.15)';
const OF = 'rgba(249,115,22,0.06)';
const GL = '#FBBF24';
const PR = '#34D399';
const MU = '#8888A0';
const FA = '#555568';
const BO = 'rgba(255,255,255,0.06)';
const WA = '#EF4444';

/* ──────────────────────────────────────────────────────────────
 * Package data — every tier, category & line‑item
 * ────────────────────────────────────────────────────────────── */
const pkgData: Record<string, Package[]> = {
  oneTime: [
    {
      name: 'Starter Launch',
      price: 4500,
      disp: '$4,500',
      tag: 'Best for new businesses',
      tl: '4\u20136 weeks',
      scope: [
        { i: 'Custom website (5 pages)', l: 'Fully custom-designed, mobile-responsive website built in Next.js. Includes: Home, About, Services, Contact, and 1 additional page of your choice. Each page includes responsive layout for desktop, tablet, and mobile. SEO meta titles and descriptions written for all 5 pages. SSL certificate and hosting setup on Vercel included.' },
        { i: 'Brand identity (logo + colors)', l: '2 initial logo concepts presented as mockups. You choose 1 for final refinement. Deliverables: logo files in PNG, SVG, and PDF formats (full color, white, and black versions). 1 primary color palette (5 colors with hex codes) and 1 font pairing (heading + body). No full brand guidelines document at this tier.' },
        { i: 'AI chat widget', l: '1 AI-powered chatbot embedded on your website. Trained on 25 question-and-answer pairs you provide (e.g., pricing, hours, services). Includes a lead capture form that sends inquiries to your CRM. Basic greeting message and fallback response configured.' },
        { i: 'CRM setup (GoHighLevel)', l: '1 sales pipeline created with 5 stages (e.g., New Lead \u2192 Contacted \u2192 Proposal Sent \u2192 Won \u2192 Lost). 5 automation sequences (e.g., new lead email notification, follow-up reminder, appointment confirmation, missed call text-back, welcome email). Contact import from CSV if provided (500 contacts max).' },
        { i: 'Analytics & tracking', l: 'Google Analytics 4 installed and configured. 1 conversion goal set up (e.g., form submission, phone call click, or chatbot interaction). Google Search Console connected. Basic event tracking on CTA buttons.' },
        { i: 'Design revisions', l: '2 rounds of revisions per page. A \u2018round\u2019 = 1 consolidated set of feedback. Feedback must be submitted within 5 business days of each review. No partial or rolling feedback across multiple emails.' },
        { i: 'Content & copy', l: 'Client provides all written content (headlines, body copy, bios, service descriptions). We handle layout, formatting, and placement. If you need copywriting, it can be added at $200/page.' },
      ],
      ov: ['Additional pages: $500/page', 'Extra revision round: $300', 'Copywriting: $200/page', 'Additional Q&A (25+): $250/batch', 'Additional automation: $350 each'],
      ho: 'Payment: 50% deposit to start, 50% due upon completion (Net 7). Complete upon client sign-off OR after 2 revision rounds. Post-sign-off: $175/hr.',
      bridge: 'Includes 30 days of post-launch monitoring (bug fixes, chatbot checks, CRM health). After day 30, ongoing maintenance, updates, and AI tuning transition to our Maintain & Monitor plan ($1,500/mo) so your systems stay optimized.',
      ideal: 'Startups, solopreneurs, local businesses',
    },
    {
      name: 'Growth Accelerator',
      price: 9500,
      disp: '$9,500',
      tag: 'Most Popular',
      pop: true,
      tl: '6\u20138 weeks',
      scope: [
        { i: 'Custom website (10 pages + CMS)', l: '10 fully designed, mobile-responsive pages built in Next.js with an integrated CMS (blog or portfolio). Includes: Home, About, Services (3 service sub-pages), Blog, Contact, and 2 additional pages. 3 custom scroll or hover animations. On-page SEO for all pages (meta titles, descriptions, alt tags, schema markup). SSL, hosting on Vercel, and sitemap submission to Google included.' },
        { i: 'Brand identity (full guidelines)', l: '3 initial logo concepts presented as lifestyle mockups. 1 selected for final refinement. Full brand guidelines PDF (10 pages) including: logo usage rules, minimum sizes, clear space, color palette (primary + secondary, hex/RGB/CMYK), typography system (heading, subheading, body fonts with sizing), and tone of voice notes. 5 branded social media post templates delivered in Canva or Figma (editable).' },
        { i: 'AI chatbot', l: '1 AI-powered chatbot trained on 50 Q&A pairs. Includes appointment booking integration (connected to your Google Calendar or Calendly). Lead capture with automatic CRM entry. Custom greeting, fallback responses, and after-hours messaging configured. Chatbot embedded on 3 website pages.' },
        { i: 'AI voice agent', l: '1 inbound AI voice agent that answers calls, qualifies leads, and books appointments. 1 custom call script written and configured. 500 voice minutes included for the first month. Call recordings stored in your CRM. Includes basic call routing (transfer to you if the AI can\u2019t resolve).' },
        { i: 'Workflow automation (8 total)', l: '8 automations built in GoHighLevel. Examples: new lead notification (email + SMS), appointment reminder sequence (24hr + 1hr before), missed call text-back, post-appointment follow-up, review request after service, abandoned form re-engagement, birthday/anniversary email, and pipeline stage change triggers. Each automation includes up to 5 steps.' },
        { i: 'Google Ads setup', l: '1 Google Search campaign with 3 ad groups (targeting different keyword themes). Keyword research and negative keyword list included. 6 ad variations written (2 per ad group). 1 dedicated landing page designed, built, and connected with conversion tracking. Google Ads conversion tracking and Google Tag Manager configured. Ad spend is billed separately and paid directly to Google by you.' },
        { i: 'Client dashboard', l: '1 real-time dashboard built in GHL or Google Looker Studio. Up to 6 widgets: website traffic, lead count, pipeline value, conversion rate, ad performance, and chatbot interactions. Dashboard auto-updates and is accessible via a shareable link.' },
        { i: 'Design revisions', l: '3 rounds of revisions per deliverable (website pages, brand assets, ad creatives, and dashboard). A \u2018round\u2019 = 1 consolidated set of feedback submitted within 5 business days.' },
        { i: 'Content & copy', l: 'We write copy for your homepage and services page (1,500 words total). All other page content provided by you. Blog CMS delivered empty \u2014 you or your team creates posts, or add our content package.' },
      ],
      ov: ['Additional pages: $500/page', 'Extra revision: $300/round', 'Additional ad campaign: $1,500', 'Additional voice script: $750', 'Automations (8+): $350 each', 'Extra landing page: $900', 'Copywriting beyond included: $200/page'],
      ho: 'Payment: 50% deposit to start, 50% due upon completion (Net 7). Complete upon sign-off OR 3 revision rounds. Post-sign-off: $175/hr.',
      bridge: 'Includes 30 days post-launch: ad management, AI monitoring, and bug fixes. After day 30, your ads, AI agents, and automations need ongoing optimization to keep performing. We recommend our Growth Engine plan ($3,500/mo) to maintain momentum.',
      ideal: 'Growing businesses scaling with systems',
    },
    {
      name: 'Total Domination',
      price: 18000,
      disp: '$18,000+',
      tag: 'Enterprise-level',
      tl: '8\u201312 weeks',
      scope: [
        { i: 'Premium website (15 pages + e-commerce)', l: '15 fully designed pages built in Next.js with headless CMS (Sanity or Contentful). 6 custom animations (parallax scrolling, hover effects, page transitions, micro-interactions). E-commerce ready: 20 product listings with Shopify or Stripe integration, shopping cart, and checkout. Includes blog, resource center, or case study section. Full on-page SEO, schema markup, Open Graph tags, XML sitemap, and robots.txt. SSL, Vercel hosting, and CDN optimization included.' },
        { i: 'Complete brand system', l: '5 initial logo concepts with lifestyle mockups. 1 selected for full refinement. Complete brand guidelines document (20 pages): logo usage, clear space, minimum sizes, primary and secondary color palettes, typography hierarchy, photography style guide, icon style, brand voice and tone guidelines. Stationery design: business card, letterhead, and email signature template. Pitch deck template (15 slides, editable in Google Slides or Keynote). 10 branded social media templates (Canva or Figma, editable).' },
        { i: 'AI agent ecosystem (3 agents)', l: '3 interconnected AI agents working as a system. Example setup: Agent 1 captures leads via chatbot and scores them (hot/warm/cold). Agent 2 sends personalized email sequences based on score. Agent 3 triggers SMS follow-ups for hot leads. 1 custom decision tree mapping the full lead journey. All agents connected to your GHL CRM with automatic contact tagging and pipeline movement.' },
        { i: 'Conversational AI suite', l: '1 AI chatbot trained on 100 Q&A pairs, embedded site-wide. Includes appointment booking, lead capture, FAQ handling, and after-hours messaging. 1 AI voice agent with 2 custom call scripts (e.g., inbound sales + appointment confirmation). 1,000 voice minutes included for the first month. Call recordings stored in CRM. 5 SMS automation sequences (e.g., appointment reminders, post-call follow-up, review request, re-engagement, promotional blast).' },
        { i: 'Workflow automation (15 total)', l: '15 automations across your CRM, payment system, and calendar. Examples: lead nurture sequences, invoice reminders, payment confirmation, onboarding workflows, review requests, win-back campaigns, internal team notifications, pipeline stage automations, and birthday/milestone emails. Each automation includes up to 7 steps with conditional logic.' },
        { i: 'Google + Meta Ads (full setup)', l: '1 Google Search campaign with 5 ad groups and 10 ad variations. Full keyword research with negative keyword lists. 1 Meta (Facebook/Instagram) campaign with 3 ad sets targeting different audiences. Retargeting pixel installed on your website for both Google and Meta. 2 dedicated landing pages designed, built, and optimized for conversions. All conversion tracking configured via Google Tag Manager. Ad creative designed (6 static images + 2 carousel ads). Ad spend billed separately \u2014 paid directly to Google and Meta by you.' },
        { i: 'AI content system', l: 'Full content pipeline configured: video-to-clips workflow (upload long-form video, AI generates social clips), blog post generation template with AI assistance, and social media scheduling setup in Buffer or Later. First month of content produced and published: 4 blog posts (up to 1,000 words each, SEO-optimized) and 12 social media posts (graphics + captions). Content calendar template provided for ongoing use.' },
        { i: 'Executive dashboard', l: '1 comprehensive dashboard in GHL or Google Looker Studio. 10 widgets: website traffic, lead pipeline, conversion rate, Google Ads performance (CPC, CTR, ROAS), Meta Ads performance, chatbot interactions, voice agent call volume, email open/click rates, revenue attribution, and weekly trend charts. Automated weekly summary email sent to 3 recipients.' },
        { i: 'Design revisions', l: '3 rounds of revisions per deliverable across all assets. A \u2018round\u2019 = 1 consolidated set of feedback submitted within 5 business days.' },
        { i: 'Copywriting', l: 'Full professional copywriting for 10 website pages (headlines, body copy, CTAs, meta descriptions). Client provides raw material, notes, or bullet points for remaining pages. Ad copy for all Google and Meta campaigns written and included.' },
      ],
      ov: ['Additional pages: $500', 'Extra revision: $350/round', 'Additional AI agent: $2,500', 'Additional ad campaign: $1,500', 'Voice script: $750', 'Automations (15+): $400 each', 'Products (20+): $75/product', 'Content after month 1: requires retainer'],
      ho: 'Payment: 50% deposit to start, 25% at midpoint milestone, 25% due upon completion (Net 7). Complete upon sign-off OR 3 rounds. Post-sign-off: $175/hr.',
      bridge: 'Includes 45 days post-launch: full monitoring, ad management, AI tuning, and bug fixes. After day 45, your AI ecosystem, ad campaigns, and content systems need ongoing management to deliver results. We recommend our Full Partnership ($7,500/mo) or Growth Engine ($3,500/mo) based on your needs.',
      ideal: 'Established businesses wanting full AI infrastructure',
    },
  ],
  socialSetup: [
    {
      name: 'Single Platform Setup',
      price: 1200,
      disp: '$1,200',
      tag: 'Get one channel right',
      tl: '3\u20135 days',
      scope: [
        { i: 'Platform selection', l: '1 platform of your choice: Instagram, LinkedIn, Facebook, TikTok, YouTube, X (Twitter), or Pinterest. We set up from scratch or overhaul your existing profile.' },
        { i: 'Profile optimization', l: 'Bio written (up to 150 characters for IG, up to 2,000 for LinkedIn, etc. \u2014 platform-appropriate). Profile photo resized and optimized for the platform. Cover image or banner custom-designed to match your brand. Featured sections, highlights, or pinned posts configured (where applicable). Contact info, website link, CTA buttons, and category/industry tags set up.' },
        { i: 'Visual identity assets', l: '1 custom profile photo (branded initials, headshot overlay, or logo mark) sized for the platform. 1 custom cover image or banner designed to match your brand colors and messaging. All files delivered in PNG and editable format (Canva or Figma). 1 round of revisions on visual assets.' },
        { i: 'Content templates (3)', l: '3 branded, reusable post templates designed in Canva or Figma. Includes: 1 quote/tip template, 1 promotional/service template, and 1 engagement template (question, poll, or CTA). Each template uses your brand colors, fonts, and logo. Fully editable so your team can swap text and images.' },
        { i: 'Hashtag & keyword strategy', l: 'Platform-specific hashtag or keyword research based on your industry and target audience. 3 hashtag/keyword sets delivered (e.g., 1 broad reach set, 1 niche set, 1 branded set). Each set contains 15\u201330 hashtags or keywords. Delivered as a shareable document with usage instructions.' },
        { i: 'Launch content (4 posts)', l: '4 ready-to-publish posts: static graphics with captions written. Includes: 1 introduction/welcome post, 1 service or product highlight, 1 social proof or testimonial post, and 1 CTA or engagement post. Graphics sized for the specific platform. Captions include relevant hashtags from your strategy sets.' },
        { i: 'Platform guide (PDF)', l: '1-page PDF tailored to your platform. Covers: best times to post, ideal post frequency, content types that perform best, hashtag usage tips, and engagement best practices. Actionable and specific to your industry.' },
      ],
      ov: ['Additional platform: $1,200 each', 'Extra post templates: $100 each', 'Extra launch posts (4+): $60 each', 'Revision round: $175', 'Video content (Reels/Shorts): $175 each'],
      ho: 'Payment: 50% deposit to start, 50% due upon completion (Net 7). Complete upon sign-off OR 1 revision round. Post-delivery changes: $175/hr.',
      bridge: 'Your profiles are set up and ready to go. To keep them active and growing, add our Social Starter plan ($1,500/mo) or individual platform management starting at $650/mo.',
      ideal: 'Businesses starting fresh on a platform',
    },
    {
      name: 'Multi-Platform Launch',
      price: 2000,
      disp: '$2,000',
      tag: 'Most Popular',
      pop: true,
      tl: '1\u20132 weeks',
      scope: [
        { i: 'Platforms (3 included)', l: 'Choose 3 platforms: Instagram, LinkedIn, Facebook, TikTok, YouTube, X, or Pinterest. New profiles created from scratch or existing profiles fully overhauled.' },
        { i: 'Profile optimization (all 3)', l: 'Bios written and optimized per platform. Profile photos and cover images/banners custom-designed for each (sized correctly per platform specs). CTAs, contact info, website links, and category tags configured. Highlights, featured sections, or pinned posts set up where applicable. All profiles cross-linked to each other and your website.' },
        { i: 'Cohesive visual identity', l: 'Matching profile photos and banners across all 3 platforms for brand consistency. Designed to align with your existing brand (or new brand if bundled with a one-time project). Delivered in PNG + editable Canva or Figma files. 2 rounds of revisions on all visual assets.' },
        { i: 'Content templates (15 total)', l: '5 branded, reusable post templates per platform (15 total). Each set includes: 1 quote/tip, 1 promotional, 1 testimonial/social proof, 1 behind-the-scenes, and 1 engagement/CTA template. All templates editable in Canva or Figma with your brand colors, fonts, and logo. Templates adapted for each platform\u2019s dimensions (e.g., square for IG, landscape for LinkedIn, vertical for TikTok).' },
        { i: 'Hashtag & keyword strategy', l: 'Per-platform research based on your industry and competitors. 5 hashtag or keyword sets per platform (15 total). Each set contains 15\u201330 hashtags/keywords organized by: broad reach, niche, branded, trending, and location-based. Delivered as a shared spreadsheet or doc with usage guidelines.' },
        { i: 'Launch content (18 posts total)', l: '6 ready-to-publish posts per platform (18 total). Mix of static graphics and carousel posts. Each post includes: designed graphic, written caption, relevant hashtags, and recommended posting time. Content covers: brand introduction, service highlight, testimonial/proof, educational tip, behind-the-scenes, and engagement/CTA.' },
        { i: '30-day content calendar', l: 'Full calendar mapping 30 days of post ideas with: suggested post type, topic, caption prompts, optimal posting times, and hashtag sets to use. Delivered as a Google Sheet or Notion template you can reuse and adapt each month.' },
        { i: 'Platform guides (3 PDFs)', l: '1 per-platform PDF guide covering: best times to post, ideal frequency, content types that perform, hashtag tips, engagement strategies, and algorithm-specific advice. Tailored to your industry.' },
        { i: 'Link-in-bio page', l: '1 link-in-bio page set up on Linktree, Later, or a custom-built page. Up to 8 links configured (website, services, booking, social profiles, etc.). Styled to match your brand colors and logo.' },
      ],
      ov: ['Additional platform: $500 each', 'Extra templates: $75 each', 'Extra launch posts (6+): $50 each', 'Revision round: $175', 'Video content: $175 each', 'Additional link-in-bio page: $200'],
      ho: 'Payment: 50% deposit to start, 50% due upon completion (Net 7). Complete upon sign-off OR 2 revision rounds. Post-delivery: $175/hr.',
      bridge: 'All platforms launch-ready with 30 days of content planned. To keep growing, we recommend our Social Growth plan ($2,500/mo) or per-platform add-ons.',
      ideal: 'Businesses launching or refreshing their social presence',
    },
    {
      name: 'Full Social Rebrand',
      price: 3500,
      disp: '$3,500',
      tag: 'Complete overhaul',
      tl: '2\u20133 weeks',
      scope: [
        { i: 'Platforms (5 included)', l: '5 platforms: Instagram, LinkedIn, Facebook, TikTok, YouTube, X, and/or Pinterest. Full audit of existing profiles followed by complete rebrand. Old profiles updated in-place (no loss of followers or history).' },
        { i: 'Social media audit', l: 'Detailed review of each existing profile: follower demographics, engagement rates, top-performing content, posting consistency, and profile completeness score. Competitor benchmarking against 3 competitors you choose (or we recommend). Gap analysis identifying missed opportunities in content, hashtags, engagement, and platform features. Delivered as a written audit report (PDF, 3\u20135 pages) with actionable recommendations.' },
        { i: 'Profile overhaul (all platforms)', l: 'New bios written for each platform (optimized for search and conversions). New profile photos and cover images/banners designed per platform. All CTAs, contact info, links, highlights, featured sections, and pinned posts updated. Brand voice consistency enforced across all platforms. Category tags, industry labels, and about sections refreshed.' },
        { i: 'Complete social brand kit', l: '10 branded post templates per platform (50 total across 5 platforms). Template types include: quotes, tips, promotions, testimonials, carousels, before/after, behind-the-scenes, team spotlights, announcements, and engagement posts. Story templates: 5 per platform for IG, Facebook, and TikTok (where applicable). Highlight cover icons for Instagram (8 custom icons). All templates delivered in Canva or Figma, fully editable with your brand colors, fonts, and logo.' },
        { i: 'Hashtag & SEO strategy', l: 'Deep research per platform based on your niche, audience, and competitors. 10 hashtag/keyword sets per platform (50 total). Organized by: broad reach, niche, branded, trending, location, and competitor gap keywords. Competitor gap analysis showing hashtags and keywords your competitors use that you don\u2019t. Delivered as a shared spreadsheet with usage guidelines and rotation schedule.' },
        { i: 'Launch content (40 posts + 4 videos)', l: '8 ready-to-publish posts per platform (40 total). Mix of static graphics, carousels, and text-based posts. Up to 4 short-form videos (Reels, Shorts, or TikToks) \u2014 we edit from footage you provide or create using AI tools. We do not shoot video. Each post includes: designed graphic, written caption, hashtags, and recommended posting time.' },
        { i: '60-day content calendar', l: 'Full calendar mapping 60 days of content across all platforms. Includes: weekly themes/content pillars, specific post topics, caption prompts, hashtag sets, optimal posting times, and space for trending/reactive content. Delivered as a Google Sheet or Notion template. Reusable framework you can adapt each month.' },
        { i: 'Link-in-bio page', l: '1 custom-designed link-in-bio page (Linktree, Later, or custom-built). Up to 12 links configured and styled to match your new social brand. Includes analytics tracking if platform supports it.' },
        { i: 'YouTube setup (if included)', l: 'If YouTube is one of your 5 platforms: channel art (banner + profile photo) designed. Default thumbnail template created in Canva (editable for each video). Existing playlists organized and titled for SEO. About section rewritten with keywords. Channel tags and default upload settings configured for search visibility.' },
        { i: 'Revisions', l: '2 rounds of revisions on all deliverables (visual assets, templates, audit report, calendar). A \u2018round\u2019 = 1 consolidated set of feedback within 5 business days.' },
      ],
      ov: ['Additional platform: $400 each', 'Extra templates: $60 each', 'Extra launch posts (8+): $45 each', 'Extra video: $175 each', 'Revision round: $250', 'YouTube intro/outro video: $600'],
      ho: 'Payment: 50% deposit to start, 50% due upon completion (Net 7). Complete upon sign-off OR 2 revision rounds. Post-delivery: $175/hr.',
      bridge: 'Your entire social presence is rebuilt and launch-ready with 60 days of content. To maintain momentum, we recommend Social Domination ($4,500/mo) or Social Growth ($2,500/mo).',
      ideal: 'Established businesses with outdated or inconsistent social presence',
    },
  ],
  monthly: [
    {
      name: 'Maintain & Monitor',
      price: 1500,
      disp: '$1,500',
      per: '/mo',
      tag: 'Keep things running',
      com: '3-month minimum',
      scope: [
        { i: 'Website maintenance', l: 'Monthly plugin, framework, and dependency updates. Bug fixes for broken links, layout issues, and display errors. Page speed monitoring and optimization (image compression, caching, lazy loading). Uptime monitoring with alerts. Does NOT include building new pages, redesigning existing pages, or adding new features.' },
        { i: 'AI chatbot monitoring', l: 'Monthly uptime and response accuracy check. Up to 10 Q&A pair updates per month (adding new questions, refining answers, fixing incorrect responses). Lead capture and form submission testing. Chatbot performance summary included in monthly report.' },
        { i: 'Monthly performance report', l: '1 report emailed by the 5th of each month covering: website traffic (sessions, users, page views), top-performing pages, lead count and source breakdown, conversion rate, and chatbot interaction stats. Delivered as a PDF or dashboard link. Report is sent \u2014 not presented live. Live calls available as an add-on.' },
        { i: 'Design updates (2 hrs/mo)', l: '2 hours of design and content updates per month. Covers: text changes, image swaps, button updates, minor layout adjustments, and banner replacements. Hours roll over to the next month only (max accumulation: 4 hours). Does NOT include new page designs, feature builds, or structural changes. Time tracked and reported.' },
        { i: 'CRM pipeline management', l: 'Monthly review of your GHL pipeline health: stuck leads, stale deals, and automation errors. 3 automation adjustments per month (e.g., updating email copy, changing trigger timing, fixing broken sequences). Contact list hygiene: duplicate flagging and bounce removal (500 contacts/mo max).' },
        { i: 'Support', l: 'Text and email support only (no phone, no live calls at this tier). 48-hour response time during business days (M\u2013F 9\u20135). Up to 10 support requests per month. Each request = 1 specific ask (not a list of changes). Requests beyond 10 billed at $175/hr.' },
      ],
      ov: ['Design beyond 2hr: $175/hr', 'New page: $500', 'Live call: $250/hr', 'Automations (3+): $250 each', 'Emergency/same-day: +50%'],
      ex: 'No ad management, no content creation, no new features, no voice agents, no social media. Requires higher tier.',
      ideal: 'Peace of mind after launch',
    },
    {
      name: 'Growth Engine',
      price: 3500,
      disp: '$3,500',
      per: '/mo',
      tag: 'Most Popular',
      pop: true,
      com: '6-month minimum',
      scope: [
        { i: 'Everything in Maintain & Monitor', l: 'All website maintenance, AI monitoring, monthly report, CRM management, and email support \u2014 same limits and rules apply. Design hours replaced by the 5 hrs/mo below (not stacked).' },
        { i: 'Google Ads management', l: '2 active Google Search campaigns managed. Monthly keyword optimization, bid adjustments, and negative keyword updates. 3 A/B tests per month (ad copy, landing page elements, or audience targeting). Monthly performance review with CPC, CTR, conversion rate, and ROAS analysis. Ad spend up to $5,000/mo managed at this tier. Ad spend above $5K: additional $500/mo per $5K tier. Ad spend billed separately \u2014 paid by you directly to Google.' },
        { i: 'Meta Ads management', l: '2 active Meta (Facebook/Instagram) campaigns managed. 1 creative refresh per month: 3 new ad creatives designed (static images or carousels). 2 new audience tests per month. Retargeting audience maintenance and lookalike audience updates. Monthly performance review. Ad spend billed separately \u2014 paid by you directly to Meta.' },
        { i: 'AI-assisted content production', l: '4 blog posts per month (up to 800 words each, SEO-optimized with keywords, meta descriptions, and internal links). 12 social media posts per month (designed graphics + written captions with hashtags). 1 round of revisions per piece (must be requested within 3 business days of delivery). Client approves the monthly content calendar by the 5th of each month. Late approval = delayed delivery with no deadline guarantee.' },
        { i: 'AI system optimization', l: 'Chatbot: 15 Q&A pair updates per month. Review of chatbot conversion rate and response accuracy. Voice agent: 1 call script revision per month (adjusting language, flow, or qualification criteria). AI performance metrics included in monthly report. Does NOT include building new agents or new automation workflows.' },
        { i: 'Strategy updates', l: 'Monthly recorded Loom video walkthrough covering your performance, recommendations, and next steps (10\u201315 min). You respond via text, email, or voice memo \u2014 no live calls required. Questions answered within 1 business day via text or email. 1 optional live call per month available on request (30 min max).' },
        { i: 'Design & development (5 hrs/mo)', l: '5 hours of design and development work per month. Covers: new landing pages, page updates, minor feature additions, graphic design for campaigns, or template customization. Hours do NOT roll over \u2014 use them or lose them. Full page redesigns or major feature builds scoped and quoted separately. Time tracked and reported monthly.' },
      ],
      ov: ['Design beyond 5hr: $175/hr', 'Ad spend >$5K: +$500/mo per $5K tier', 'Blog: $250 each', 'Social posts (12+): $60 each', 'Creative refresh: $500', 'Additional live call: $250/hr', 'New AI agent: $2,500', 'Emergency: +50%'],
      ex: 'No fractional CMO, no unlimited ads, no brand refreshes, no video production, no dedicated social management. Requires higher tier or Social add-on.',
      ideal: 'Businesses actively scaling revenue',
    },
    {
      name: 'Full Partnership',
      price: 7500,
      disp: '$7,500',
      per: '/mo',
      tag: 'Fractional CMO + Team',
      com: '6-month minimum',
      scope: [
        { i: 'Everything in Growth Engine', l: 'All website maintenance, AI monitoring, reports, CRM management, Google + Meta ads management, AI content production, AI optimization, strategy updates, and email support \u2014 with expanded limits listed below. Design hours and strategy updates replaced by expanded versions below (not stacked).' },
        { i: 'Dedicated strategist', l: 'Named point of contact who knows your business, goals, and brand. Available via text or email Monday\u2013Friday 9AM\u20135PM (your time zone). Not available 24/7, weekends, or holidays. Manages all deliverables, coordinates the team, and proactively brings recommendations via Loom, email, or text. Responds within 4 business hours during working days.' },
        { i: 'Ad management (expanded)', l: 'Unlimited active campaigns across Google and Meta. Full-funnel strategy: awareness, consideration, and conversion campaigns. Monthly creative refreshes, audience testing, bid optimization, and budget reallocation. Ad spend up to $20,000/mo managed. Ad spend above $20K requires custom pricing. Monthly ad performance report with ROAS, CPA, and budget efficiency analysis. Ad spend billed separately.' },
        { i: 'AI ecosystem management', l: '5 active AI agents managed and optimized (chatbots, voice agents, email agents, SMS agents). 2 new automation workflow builds per month (e.g., new lead sequence, upsell workflow, re-engagement campaign). Monthly agent performance review: response accuracy, resolution rate, call duration, and lead conversion. Agent retraining and script updates as needed within scope.' },
        { i: 'Content system (expanded)', l: '8 blog posts per month (up to 1,000 words each, SEO-optimized). 20 social media posts per month (designed graphics + written captions with hashtags and CTAs). 4 short-form video clips per month (Reels, Shorts, or TikToks) \u2014 edited from footage you provide or created with AI tools. We edit, we do not shoot. 1 round of revisions per piece. Content calendar delivered by the 1st of each month for your approval.' },
        { i: 'Monthly strategy meeting + weekly updates', l: '1 live strategy meeting per month (60 min max). Weekly updates delivered via Loom video or written summary covering: performance review, upcoming priorities, campaign adjustments, and strategic recommendations. You respond via text, email, or voice memo. Day-to-day communication is all text and email \u2014 no ad-hoc calls.' },
        { i: 'Design & development (15 hrs/mo)', l: '15 hours of design and development work per month. Covers: new funnels, landing pages, page redesigns, feature builds, graphic design, email template design, or presentation design. Hours roll over to the next month only (max accumulation: 30 hours). Full website redesigns or app development scoped and quoted separately. Time tracked and reported monthly.' },
        { i: 'Quarterly brand refresh', l: '1 brand refresh per quarter (every 3 months). Includes 5 new creative assets: updated social templates, seasonal ad creatives, refreshed email headers, or new promotional graphics. Does NOT include a full rebrand (new logo, new guidelines, new brand system). Full rebrands quoted separately at $6,000+.' },
      ],
      ov: ['Design beyond 15hr: $175/hr', 'Ad spend >$20K: custom', 'Blogs: $250 each', 'Video clips (4+): $300 each', 'Shooting: separate', 'Full rebrand: $6K+ separate', 'AI agent: $2,500 each', 'Weekend/after-hours: +75%'],
      ex: 'No in-person events, no PR/media outreach, no video shooting (edit only), no app development. Quoted separately.',
      ideal: 'Businesses investing $5K+/mo in ads',
    },
  ],
  social: [
    {
      name: 'Social Starter',
      price: 1500,
      disp: '$1,500',
      per: '/mo',
      tag: '1\u20132 Platforms',
      com: '3-month minimum',
      scope: [
        { i: 'Platforms (2 included)', l: 'Choose 2 platforms from: Instagram, LinkedIn, Facebook, TikTok, YouTube, or X. We manage posting, scheduling, and basic engagement on both.' },
        { i: 'Content creation (16 posts/mo)', l: '8 posts per platform (16 total per month). All static graphic posts with written captions and relevant hashtags. No video production at this tier. Content types: tips, promotions, testimonials, quotes, and engagement posts. Graphics designed in your brand style using your colors, fonts, and logo.' },
        { i: 'Scheduling & publishing', l: 'We create a monthly content calendar, schedule all posts, and publish at optimal times for your audience. Client must approve the content calendar by the 3rd of each month. Late approval = posts may not go live on the planned schedule.' },
        { i: 'Basic engagement', l: 'Up to 30 minutes per day (business days only, M\u2013F). Includes: responding to comments and direct messages, liking relevant comments, and flagging any issues or negative feedback for your review. Does NOT include proactive outreach or community building.' },
        { i: 'Monthly report', l: '1 report emailed by the 5th of each month. Covers: follower growth, post reach, engagement rate (likes, comments, shares), top-performing posts, and recommendations for next month. Delivered as a PDF. Not presented live.' },
        { i: 'Content revisions', l: '1 round of revisions per monthly content batch. All revision requests must be submitted as a single consolidated document within 3 business days of content calendar delivery.' },
        { i: 'Hashtag strategy', l: 'Initial hashtag research for both platforms at onboarding (3 sets of 15\u201330 hashtags each). Updated once per quarter. Sets organized by: broad reach, niche, and branded/local hashtags.' },
      ],
      ov: ['Additional platform: $400/mo', 'Extra posts (8+): $60 each', 'Video reel/short: $175 each', 'Additional revision round: $175', 'Story creation: $30/story'],
      ex: 'No video production, no paid social ads, no influencer outreach, no community building beyond basic engagement. These require Social Growth or add-ons.',
      ideal: 'Businesses needing consistent presence on 1\u20132 channels',
    },
    {
      name: 'Social Growth',
      price: 2500,
      disp: '$2,500',
      per: '/mo',
      tag: 'Most Popular',
      pop: true,
      com: '6-month minimum',
      scope: [
        { i: 'Platforms (4 included)', l: 'Choose 4 platforms: Instagram, LinkedIn, Facebook, TikTok, YouTube, or X. We manage content creation, scheduling, publishing, and active engagement across all.' },
        { i: 'Content creation (48 posts + 4 videos/mo)', l: '12 posts per platform (48 total per month). Mix of static graphics, carousel posts (up to 5 slides each), and text-based posts. 4 short-form videos per month (Reels, Shorts, or TikToks) distributed across your platforms. We edit video from footage you provide or create using AI video tools. We do not shoot. All graphics designed in your brand style with written captions, hashtags, and CTAs.' },
        { i: 'Scheduling & publishing', l: 'Full content calendar created monthly with post topics, formats, captions, and posting times. Client must approve calendar by the 3rd of each month. We handle all scheduling and publishing at optimal times per platform. Late approval = delayed delivery with no guarantee on original posting schedule.' },
        { i: 'Active engagement', l: 'Up to 1 hour per day (business days, M\u2013F). Includes: responding to all comments and DMs, liking and replying to mentions, and proactive engagement on relevant accounts in your industry (30 min/day \u2014 liking, commenting, following). Brand monitoring for mentions and tags. Negative comments or PR issues flagged to you immediately.' },
        { i: 'Reporting & strategy', l: 'Monthly report (delivered by the 5th) covering: follower growth, reach, engagement rate, top posts, and audience demographics. 1 monthly Loom video walkthrough with performance review, content recommendations, and trend opportunities. You respond via text or email. 1 optional live call per month available on request (30 min max).' },
        { i: 'Video production', l: '4 short-form videos per month. Each video: up to 60 seconds, edited with captions, transitions, music (royalty-free), and brand graphics. We edit from raw footage you provide (phone clips, screen recordings, interviews) or generate using AI tools. We do not shoot video or provide on-site production.' },
        { i: 'Content revisions', l: '2 rounds of revisions per monthly content batch. All feedback submitted as a single consolidated document within 3 business days of delivery.' },
        { i: 'Monthly content strategy', l: 'Monthly content pillars defined (3\u20135 themes that guide all content). Trend monitoring and recommendations for timely/reactive posts. Hashtag strategy maintained and updated monthly across all platforms.' },
      ],
      ov: ['Additional platform: $400/mo', 'Extra posts (12+): $50 each', 'Extra video: $175 each', 'Video shooting: quoted separately', 'Additional live call: $250/hr', 'Influencer outreach: $600/mo add-on', 'Story creation: $25/story'],
      ex: 'No video shooting, no paid ad management (add Google/Meta ads from main packages), no influencer contract negotiation. Quoted separately.',
      ideal: 'Businesses serious about growing audience and engagement',
    },
    {
      name: 'Social Domination',
      price: 4500,
      disp: '$4,500',
      per: '/mo',
      tag: 'Full-service social',
      com: '6-month minimum',
      scope: [
        { i: 'Platforms (6 included)', l: 'Full coverage across 6 platforms: Instagram, LinkedIn, Facebook, TikTok, YouTube, and X. All content creation, scheduling, publishing, community management, and strategy handled for you.' },
        { i: 'Content creation (120 posts + 8 videos/mo)', l: '20 posts per platform (120 total per month). Mix of static graphics, carousels, stories, text posts, and polls. 8 short-form videos per month (Reels, Shorts, TikToks) distributed across platforms. All graphics in your brand style with captions, hashtags, and CTAs. Story content for Instagram, Facebook, and TikTok where applicable.' },
        { i: 'YouTube management', l: '2 long-form YouTube videos per month (edit only \u2014 from footage you provide or repurposed from existing content). Custom thumbnail designed for each video. SEO-optimized titles, descriptions, and tags written. Playlist organization and end screen/card configuration. We edit and optimize \u2014 we do not script, shoot, or produce original footage.' },
        { i: 'Full community management', l: '2 hours per day, Monday\u2013Friday. Includes: responding to all comments, DMs, and mentions across all platforms. Proactive outreach: engaging with relevant accounts, industry hashtags, and potential customers. Brand monitoring: tracking mentions, tags, and relevant conversations. Sentiment flagging: negative feedback or PR concerns escalated to you immediately. Weekly engagement summary included in reporting.' },
        { i: 'Reporting & strategy', l: 'Weekly analytics snapshot emailed every Monday (key metrics across all platforms). Monthly deep-dive report (delivered by the 5th): follower growth, engagement rates, reach, impressions, top content, audience demographics, and competitor benchmarking. Monthly Loom video walkthrough covering: performance review, upcoming campaigns, content direction, and growth opportunities. You respond via text or email. 1 optional live call per month on request (30 min max).' },
        { i: 'Video production (8 short + 2 long/mo)', l: '8 short-form videos (up to 60 seconds each) with captions, transitions, royalty-free music, and brand graphics. 2 long-form YouTube videos (up to 10 minutes each, edited from raw footage). We edit \u2014 we do not shoot. You provide raw footage (phone clips, interviews, screen recordings, presentations) or we create using AI video tools. Professional-grade editing with branded intros/outros if you have them.' },
        { i: 'Content revisions', l: '2 rounds of revisions per monthly content batch. All feedback submitted as a consolidated document within 3 business days.' },
        { i: 'Quarterly social strategy', l: 'Full social media strategy refresh every quarter. Includes: content pillar updates, trend analysis, competitor audit (3 competitors), audience growth roadmap, and platform-specific recommendations. Strategy document delivered as a PDF or slide deck (up to 10 pages). Monthly content pillars and trend monitoring ongoing between quarters.' },
        { i: 'Influencer coordination', l: 'Outreach to 5 micro-influencers per month. We research, identify, and contact potential partners in your niche. We handle negotiation of collaboration terms (gifted product, paid post, or content exchange). You approve all final deals before any agreement is made. We provide an influencer brief template and manage communication through agreement. Does NOT include influencer payment \u2014 that is your cost, separate from this retainer.' },
      ],
      ov: ['Extra platform: $400/mo', 'Extra posts (20+): $40 each', 'Extra long-form video: $500 each', 'Video shooting: quoted separately', 'Influencer beyond 5: $125/outreach', 'Paid ad management: add from main packages', 'Additional live call: $250/hr', 'Weekend content: +50%'],
      ex: 'No video shooting/production (edit only), no paid ad management (add separately), no PR/press outreach. Quoted separately.',
      ideal: 'Brands wanting full social dominance across all channels',
    },
  ],
  customBuild: [
    {
      name: 'Discovery & Scoping',
      price: 2500,
      disp: '$2,500',
      tag: 'Required first step',
      tl: '1\u20132 weeks',
      scope: [
        { i: 'Kickoff questionnaire + recorded workshop', l: 'Detailed intake questionnaire covering: business goals, user types and roles, core features, must-haves vs. nice-to-haves, integrations (payment, CRM, email, APIs), and timeline expectations. We review your responses and deliver a recorded Loom walkthrough of our understanding and follow-up questions. You respond via text, email, or voice memo. 1 optional live call available if needed (60 min max).' },
        { i: 'User flow mapping', l: 'Visual diagrams showing how each user type moves through the system. For example: tenant logs in \u2192 submits maintenance request \u2192 property manager gets notified \u2192 assigns vendor \u2192 tenant gets update. Covers all core user journeys (5 flows). Delivered as a FigJam or Miro board.' },
        { i: 'Technical architecture document', l: 'Written breakdown of the proposed tech stack, database structure, hosting, third-party integrations, and deployment plan. Includes recommendations on build vs. buy decisions (e.g., custom payment processing vs. Stripe, custom auth vs. Clerk). Identifies technical risks and dependencies.' },
        { i: 'Wireframes (10 screens)', l: 'Low-fidelity wireframes for 10 key screens showing layout, navigation, and content hierarchy. Not pixel-perfect design \u2014 focused on structure and user experience. Delivered in Figma. 1 round of revisions.' },
        { i: 'Scope of Work document', l: 'Detailed SOW with: every feature listed and described, phase breakdown (what ships when), timeline estimates per phase, fixed-price quote for the full build, assumptions, exclusions, and change order policy. This becomes the contract foundation.' },
        { i: 'Fixed-price build quote', l: 'Based on the discovery work, we provide a firm fixed-price quote for the full build. No hourly surprises. If the project scope changes after signing, we use a change order process with pre-approved rates.' },
      ],
      ov: ['Additional wireframe screens: $250 each', 'Extra user flow diagrams: $300 each', 'Competitive analysis add-on: $750 (audit 3 competitor products)', 'Discovery extension beyond 2 weeks: $1,200/week'],
      ho: 'Payment: 50% deposit to start, 50% due upon delivery (Net 7). Discovery fee is credited toward the full build if you proceed within 30 days of delivery. If you don\u2019t proceed, all deliverables (wireframes, SOW, architecture doc) are yours to keep and use with any developer.',
      ideal: 'Anyone considering a custom build \u2014 this is step one',
    },
    {
      name: 'Standard Build',
      price: 25000,
      disp: '$25,000',
      tag: 'Most common',
      pop: true,
      tl: '6\u201312 weeks',
      scope: [
        { i: 'Full UI/UX design', l: 'Complete interface design in Figma for all screens (typically 15\u201330 screens depending on complexity). Includes: responsive layouts for desktop and mobile, component library, design system with your brand colors/fonts/spacing, and interactive prototype for stakeholder review. 2 rounds of design revisions before development begins.' },
        { i: 'Frontend development', l: 'Built in Next.js (React) with TypeScript. Fully responsive across desktop, tablet, and mobile. Server-side rendering for performance and SEO where applicable. Clean, maintainable codebase with component architecture. Includes loading states, error handling, empty states, and form validation on all interactive elements.' },
        { i: 'Backend development', l: 'RESTful or GraphQL API built in Node.js. Database design and implementation (PostgreSQL or MongoDB depending on project needs). User authentication and role-based access control (e.g., admin, manager, tenant, vendor). Data validation, error handling, and API documentation. File upload handling if required (images, documents, up to 10MB per file).' },
        { i: 'Core features', l: 'Scope defined in Discovery SOW. Standard builds typically include: user registration and login, role-based dashboards, CRUD operations for core data (e.g., properties, tenants, requests), search and filtering, notification system (email and/or in-app), and basic reporting/analytics. Features beyond SOW require a change order.' },
        { i: 'Third-party integrations (3 included)', l: '3 integrations with external services. Common examples: Stripe (payments), Twilio (SMS/voice), SendGrid (email), Google Maps, Calendly, QuickBooks, Zapier, or any service with a documented REST API. Each integration includes: setup, data mapping, error handling, and testing. Complex integrations (e.g., custom ERP, legacy systems without modern APIs) quoted separately.' },
        { i: 'Hosting & deployment', l: 'Deployed to production on Vercel (frontend) and Railway, Render, or AWS (backend). CI/CD pipeline configured for automated deployments from GitHub. SSL certificate, custom domain setup, and DNS configuration. Environment variables and secrets management. Staging environment included for testing before production releases.' },
        { i: 'Testing & QA', l: 'Manual testing across Chrome, Safari, Firefox, and Edge. Mobile testing on iOS Safari and Android Chrome. All core user flows tested end-to-end. Bug fixes during development are included. Post-launch bug fixes covered for 30 days (see handoff terms below).' },
        { i: 'Documentation', l: 'Technical documentation: API endpoints, database schema, environment setup guide, and deployment instructions. User documentation: how-to guide for admin users covering all core features (delivered as a PDF or Notion page, up to 10 pages). Codebase is commented and organized for future developers.' },
        { i: 'Revisions', l: '2 rounds of design revisions before development. During development, feedback is handled via a shared task board (Linear or GitHub Issues). Post-development: 1 round of revisions on the final product before launch. Scope changes during development require a change order with pre-approved rates ($200/hr).' },
      ],
      ov: ['Additional integrations: $3,000 each', 'Extra screens beyond SOW: $800/screen', 'Change orders during development: $200/hr', 'Additional user roles: $2,000 per role', 'Advanced reporting/analytics dashboard: $5,000', 'Native mobile app (iOS or Android): see Enterprise Build tier'],
      ho: 'Payment: 50% deposit to start, 25% at midpoint milestone, 25% due upon completion (Net 7). Includes 30 days post-launch bug fixes (issues with features in the original SOW only). After 30 days, ongoing support transitions to a maintenance retainer. All code is yours \u2014 full ownership of the codebase, design files, and documentation transferred at project completion.',
      bridge: 'Your platform is live and stable. To keep it running, secure, and evolving, we recommend our Dev Support retainer ($1,500/mo) or an Hourly Bank ($2,500/mo for 10 hrs).',
      ideal: 'Portals, dashboards, internal tools, and SaaS MVPs',
    },
    {
      name: 'Enterprise Build',
      price: 75000,
      disp: '$75,000+',
      tag: 'Complex systems',
      tl: '12\u201324 weeks',
      scope: [
        { i: 'Everything in Standard Build (expanded)', l: 'All design, frontend, backend, integrations, hosting, testing, and documentation from the Standard Build \u2014 with expanded scope for larger, more complex systems. Typically 30\u201360+ screens, multiple user roles, and complex business logic.' },
        { i: 'Advanced architecture', l: 'Microservices or modular monolith architecture for scalability. Message queues (Redis, RabbitMQ) for async processing if needed. Caching layer for high-traffic endpoints. Database optimization: indexing, query optimization, and connection pooling. Infrastructure designed to handle 10,000+ concurrent users.' },
        { i: 'AI-powered features', l: 'Custom AI agents or automations built into the platform. Examples: AI-powered search, natural language processing for support tickets, predictive analytics, automated categorization, smart recommendations, or AI chatbot trained on your platform data. Includes: model selection, prompt engineering, API integration, and testing. Uses OpenAI, Anthropic, or open-source models depending on requirements.' },
        { i: 'Mobile app (if included)', l: 'Cross-platform mobile app built in React Native. Shared codebase for iOS and Android. Push notifications, offline support, and native device features (camera, GPS, biometrics). App Store and Google Play submission handled by us (you provide developer accounts). Typically 15\u201325 screens mirroring core web app functionality.' },
        { i: 'Integrations (6 included)', l: '6 third-party integrations. Includes complex integrations: payment processing with multi-party payouts (Stripe Connect), accounting sync (QuickBooks, Xero), property management APIs, MLS feeds, government/compliance APIs, or custom webhook systems. Legacy system integrations quoted separately based on API documentation quality.' },
        { i: 'Advanced security & compliance', l: 'Role-based access control with granular permissions (e.g., property-level, unit-level access). Data encryption at rest and in transit. Audit logging for sensitive actions. GDPR/CCPA compliance features if required (data export, deletion requests). Penetration testing coordination (third-party pen test recommended, not included in price).' },
        { i: 'Multi-tenant architecture', l: 'If building a SaaS: full multi-tenant database architecture so each client\u2019s data is isolated. Tenant-specific configurations, branding, and feature flags. Admin super-panel for managing all tenants. Usage tracking and billing integration if needed.' },
        { i: 'Phased delivery', l: 'Project delivered in phases (typically 3\u20134 phases). Each phase has its own deliverables, testing, and sign-off. Phase 1 is usually core MVP (launched to production). Subsequent phases add features incrementally. Each phase has a defined timeline and deliverable list from the SOW.' },
        { i: 'Revisions & change management', l: '2 rounds of design revisions per phase. Feedback managed via shared task board (Linear or GitHub Issues). Change orders for scope additions: $200/hr with written approval before work begins. Weekly status updates via Loom video or written summary. Bi-weekly recorded demo videos of completed work \u2014 you review and respond on your own time. 1 optional live call per month if needed.' },
      ],
      ov: ['Additional integrations: $5,000 each', 'Native mobile app (if not included): $30,000', 'AI feature additions: $10,000 per feature', 'Additional phases: scoped and quoted individually', 'Third-party pen test coordination: $5,000', 'White-label/multi-tenant add-on (if not included): $15,000'],
      ho: 'Payment: 50% deposit to start, 25% at midpoint milestone, 25% due upon completion (Net 7). Includes 45 days post-launch bug fixes per phase. All code, design files, and documentation transferred to you at completion. Full codebase ownership. After 45 days, ongoing support transitions to a maintenance retainer.',
      bridge: 'Complex systems require ongoing development, monitoring, and optimization. We recommend our Active Development retainer ($7,500/mo) to keep your platform evolving with your business.',
      ideal: 'SaaS platforms, multi-tenant systems, AI-integrated products, and enterprise tools',
    },
  ],
  aiAgents: [
    {
      name: 'Single Agent Build',
      price: 5000,
      disp: '$5,000',
      tag: 'One powerful agent',
      tl: '1\u20132 weeks',
      scope: [
        { i: 'Custom AI agent (1)', l: 'One purpose-built AI agent designed, trained, and deployed for your business. Choose from: voice agent, email agent, web scraping agent, PDF generation agent, customer support chatbot, lead qualification agent, data processing agent, appointment booking agent, or any custom use case. Agent is tailored to your specific workflows, brand voice, and data sources.' },
        { i: 'Agent training & configuration', l: 'We configure the agent\u2019s behavior, decision logic, and response patterns based on your requirements. Includes: up to 50 training data points (Q&A pairs, scripts, or example workflows). Custom fallback handling and error responses. Integration with 1 external system (CRM, email, calendar, database, or API).' },
        { i: 'Testing & deployment', l: 'Full end-to-end testing across all expected use cases. Edge case handling and stress testing. Deployed to your infrastructure or our managed hosting. Includes staging environment for your review before going live.' },
        { i: 'API key security', l: 'All API keys and credentials stored securely using encrypted environment variables \u2014 never hardcoded or exposed in source code. Keys are injected at runtime through your hosting provider\u2019s secrets manager (Vercel, AWS, etc.). Access restricted to the agent\u2019s execution environment only. We never store or retain your API keys after deployment. You maintain full ownership and control of all credentials at all times.' },
        { i: 'Documentation & handoff', l: 'Agent behavior documentation: what it does, how it works, and how to update it. Admin guide for modifying responses, updating training data, or pausing the agent. Architecture diagram showing how the agent connects to your systems.' },
        { i: '30-day support', l: '30 days of post-launch monitoring and bug fixes. Up to 15 training data updates during this period. Performance metrics tracked: response accuracy, completion rate, and error rate. After 30 days, ongoing optimization available via our AI Operations retainer.' },
      ],
      ov: ['Additional integration: $1,500', 'Training data beyond 50 items: $500/batch of 50', 'Extra revision round: $350', 'Rush delivery (under 1 week): +40%', 'Agent retraining: $750'],
      ho: 'Payment: 50% deposit to start, 50% due upon completion (Net 7). Complete upon sign-off OR 2 revision rounds. Agent ownership transfers to you. Post-30-day support: $200/hr or transition to retainer.',
      bridge: 'Your agent is live and working. To keep it optimized, retrained, and evolving, add our AI Operations retainer or Hourly Bank for ongoing agent management.',
      ideal: 'Businesses automating one specific workflow',
    },
    {
      name: 'Agent Team',
      price: 8500,
      disp: '$8,500',
      tag: 'Most Popular',
      pop: true,
      tl: '2\u20134 weeks',
      scope: [
        { i: 'Custom AI agents (3)', l: 'Three interconnected AI agents working as a coordinated system. Example setups: (1) Voice agent answers calls + email agent sends follow-ups + CRM agent updates pipeline. (2) Scraping agent gathers data + processing agent formats reports + email agent distributes them. (3) Chatbot captures leads + qualification agent scores them + booking agent schedules calls. Agents communicate with each other and share data automatically.' },
        { i: 'Workflow orchestration', l: 'Custom decision tree mapping how agents hand off to each other. Conditional logic: agents take different actions based on data, time of day, lead score, or custom rules. Error handling: if one agent fails, the system notifies you and queues the task for retry. All agent-to-agent communication logged and auditable.' },
        { i: 'Integrations (3 included)', l: '3 external system integrations across your agent team. Common integrations: GoHighLevel, HubSpot, Salesforce, Google Workspace, Slack, Twilio, Stripe, Shopify, Zapier, Make, or any service with a REST API. Each integration includes: data mapping, authentication, error handling, and retry logic.' },
        { i: 'API key security', l: 'All API keys, tokens, and credentials stored using encrypted environment variables and your hosting provider\u2019s secrets manager \u2014 never hardcoded, never in source code, never in logs. Each agent\u2019s credentials are isolated so one agent cannot access another\u2019s keys. We never store or retain your API keys after deployment. You maintain full ownership and control of all credentials at all times.' },
        { i: 'Agent training & testing', l: 'Each agent trained on up to 75 data points. Full end-to-end testing of the entire agent workflow (not just individual agents). Load testing for high-volume scenarios. User acceptance testing with your team before go-live.' },
        { i: '60-day support', l: '60 days of post-launch monitoring, bug fixes, and optimization. Up to 25 training data updates per agent during this period. Bi-weekly performance check-ins (email summary). After 60 days, ongoing management available via retainer.' },
      ],
      ov: ['Additional agent: $2,500', 'Additional integration: $1,500', 'Training data beyond 75/agent: $500/batch', 'Extra revision round: $400', 'Rush delivery: +40%'],
      ho: 'Payment: 50% deposit to start, 50% due upon completion (Net 7). Complete upon sign-off OR 2 revision rounds. All agents and code ownership transfer to you.',
      bridge: 'Your agent team is live and coordinated. For ongoing optimization, retraining, and new agent additions, we recommend our AI Operations retainer ($5,000/mo).',
      ideal: 'Businesses automating multi-step workflows end-to-end',
    },
    {
      name: 'AI Operations',
      price: 15000,
      disp: '$15,000+',
      tag: 'Enterprise AI ecosystem',
      tl: '4\u20138 weeks',
      scope: [
        { i: 'Custom AI agents (5+)', l: 'Five or more AI agents designed as a complete operational layer for your business. Covers multiple departments: sales, support, marketing, operations, and data. Every agent purpose-built for your workflows \u2014 no templates, no generic setups. Agent types include any combination of: voice, email, chat, scraping, PDF generation, data processing, scheduling, content creation, lead scoring, and custom use cases.' },
        { i: 'AI orchestration layer', l: 'Central coordination system that manages all agents. Intelligent routing: tasks automatically assigned to the right agent based on type, priority, and context. Queue management for high-volume scenarios. Agent-to-agent communication with shared memory and context passing. Retry logic, fallback handling, and graceful degradation when agents encounter errors.' },
        { i: 'Integrations (6 included)', l: '6 external integrations connecting your agent ecosystem to your business tools. Includes complex integrations: multi-step workflows across CRM + email + calendar + payment systems. Webhook listeners for real-time triggers. Data synchronization across platforms with conflict resolution.' },
        { i: 'Security & compliance', l: 'All API keys, tokens, and credentials stored using encrypted environment variables and enterprise-grade secrets management \u2014 never hardcoded, never in source code, never in logs. Each agent\u2019s credentials are fully isolated. Data encryption for all agent communications (in transit and at rest). Role-based access control for agent management. Audit logging for every agent action (who, what, when). PII handling protocols configured per your requirements. Data retention policies enforced automatically. We never store or retain your API keys after deployment \u2014 you maintain full ownership and control.' },
        { i: 'Training & onboarding', l: 'Each agent trained on up to 150 data points. Comprehensive recorded Loom walkthrough series showing your team how to manage, monitor, and update agents. Runbook documentation for every agent: what it does, how to modify it, and troubleshooting steps. All training delivered via recorded video \u2014 your team watches on their own time. Questions answered via text or email within 1 business day.' },
        { i: '90-day support & optimization', l: '90 days of active monitoring, optimization, and iteration. Weekly performance updates with recommendations delivered via Loom or email. Up to 50 training updates per agent. Monthly optimization report with ROI analysis. After 90 days, transitions to ongoing AI Operations retainer.' },
      ],
      ov: ['Additional agent: $2,500 each', 'Additional integration: $2,000', 'Custom AI model fine-tuning: $5,000', 'Live training call: $250/hr', 'Rush delivery: +30%'],
      ho: 'Payment: 50% deposit to start, 25% at midpoint milestone, 25% due upon completion (Net 7). Delivered in phases (typically 2\u20133 phases). Each phase has defined deliverables and sign-off. All code and agent ownership transfers to you at completion.',
      bridge: 'Your AI ecosystem is fully operational. To keep it running, optimized, and expanding, we recommend transitioning to an ongoing AI Operations retainer ($5,000/mo) or Active Development retainer ($7,500/mo).',
      ideal: 'Businesses replacing manual processes with intelligent automation at scale',
    },
    {
      name: 'Agent Maintenance',
      price: 1500,
      disp: '$1,500',
      per: '/mo',
      tag: 'Keep agents running',
      com: '3-month minimum',
      scope: [
        { i: 'Agent monitoring (up to 3)', l: '24/7 uptime and error monitoring for up to 3 AI agents. Automated alerts if an agent goes down, starts failing, or response accuracy drops below threshold. We investigate and resolve issues within 1 business day.' },
        { i: 'Training data updates (15/mo)', l: 'Up to 15 training data updates per month across all agents. Covers: adding new Q&A pairs, refining responses, updating scripts, and correcting inaccurate answers. Updates delivered within 2 business days of request.' },
        { i: 'API & integration health checks', l: 'Monthly verification that all API connections and third-party integrations are functioning. Proactive monitoring for API deprecations, rate limit changes, and authentication expirations. All API keys stored securely using encrypted environment variables \u2014 never exposed in code or logs.' },
        { i: 'Monthly performance report', l: 'Report delivered by the 5th of each month covering: agent response accuracy, completion rates, error rates, usage volume, and integration status. Includes recommendations for improving performance. Delivered as a PDF or Loom video.' },
        { i: 'Support', l: 'Text and email support with 48-hour response time (business days). Up to 8 support requests per month. Each request = 1 specific issue or question. Requests beyond 8 billed at $200/hr.' },
      ],
      ov: ['Additional agent monitoring: $300/mo per agent', 'Training updates beyond 15: $50 each', 'Emergency off-hours fix: +50%', 'New agent build: quoted separately'],
      ex: 'No new agent builds, no new integrations, no new automation workflows. This is monitoring and maintenance only. For active agent development, see Agent Growth tier.',
      ideal: 'Businesses with live agents that need to stay accurate and online',
    },
    {
      name: 'Agent Growth',
      price: 3500,
      disp: '$3,500',
      per: '/mo',
      tag: 'Most Popular',
      pop: true,
      com: '6-month minimum',
      scope: [
        { i: 'Everything in Agent Maintenance', l: 'All monitoring, training updates, API health checks, monthly reporting, and support from Agent Maintenance \u2014 with expanded limits below.' },
        { i: 'Agent monitoring (up to 6)', l: '24/7 uptime and error monitoring for up to 6 AI agents. Automated alerts, investigation, and resolution within 4 business hours.' },
        { i: 'Training data updates (40/mo)', l: 'Up to 40 training data updates per month across all agents. Includes: new Q&A pairs, script revisions, workflow adjustments, and response refinements. Updates delivered within 1 business day.' },
        { i: '1 new automation workflow/mo', l: '1 new automation workflow build per month (e.g., new lead nurture sequence, upsell trigger, re-engagement campaign, or internal notification flow). Workflow connects to your existing agents and integrations.' },
        { i: 'Monthly strategy update', l: 'Monthly Loom video walkthrough covering: agent performance review, optimization recommendations, and upcoming priorities. You respond via text or email. 1 optional live call per month on request (30 min max).' },
        { i: 'API key security & management', l: 'All API keys and credentials stored using encrypted environment variables and secrets management. Monthly credential rotation reminders. Proactive monitoring for exposed or compromised keys. You maintain full ownership and control of all credentials.' },
        { i: 'Priority support', l: 'Text and email support with 24-hour response time (business days). Critical agent failures: same-day start during business hours. Up to 15 support requests per month.' },
      ],
      ov: ['Additional agent monitoring: $250/mo per agent', 'Training updates beyond 40: $40 each', 'Additional workflow build: $1,500', 'New agent build: $2,500', 'Emergency off-hours: +50%'],
      ex: 'No enterprise orchestration, no compliance frameworks, no dedicated strategist. For full AI operations management, see Agent Command Center.',
      ideal: 'Businesses actively expanding their AI agent capabilities',
    },
    {
      name: 'Agent Command Center',
      price: 7500,
      disp: '$7,500',
      per: '/mo',
      tag: 'Full AI management',
      com: '6-month minimum',
      scope: [
        { i: 'Everything in Agent Growth', l: 'All monitoring, training updates, workflow builds, strategy updates, API security, and priority support from Agent Growth \u2014 with expanded limits below.' },
        { i: 'Agent monitoring (unlimited)', l: '24/7 monitoring for all active agents with no cap. Automated alerts, investigation, and resolution within 2 business hours. Includes orchestration layer health monitoring for multi-agent systems.' },
        { i: 'Training data updates (unlimited)', l: 'Unlimited training data updates across all agents. Script revisions, workflow adjustments, new Q&A pairs, and response tuning \u2014 as needed, no caps. Updates delivered within 1 business day.' },
        { i: '3 new automation workflows/mo', l: '3 new automation workflow builds per month. Complex multi-step workflows that span agents, integrations, and conditional logic. Includes testing, deployment, and documentation for each workflow.' },
        { i: 'Monthly strategy meeting + weekly updates', l: '1 live strategy meeting per month (60 min max). Weekly Loom updates covering performance, upcoming priorities, and optimization recommendations. You respond via text or email. Day-to-day communication is all text and email \u2014 no ad-hoc calls.' },
        { i: 'Enterprise security & compliance', l: 'All API keys and credentials managed via enterprise-grade secrets management. Credential isolation per agent. Audit logging for every agent action. Monthly security review covering: credential status, access controls, data handling, and compliance posture. PII handling protocols maintained and updated as needed. You maintain full ownership of all credentials.' },
        { i: 'New agent builds (1/mo included)', l: '1 new AI agent build per month included in scope. Covers: design, training, testing, deployment, and documentation. Additional agents quoted at discounted rate ($2,000 each vs. $5,000 standalone).' },
        { i: 'Quarterly AI audit', l: 'Every 3 months: comprehensive audit of your entire AI ecosystem covering agent performance, accuracy trends, cost efficiency, integration health, and recommendations for new automation opportunities. Delivered as a written report.' },
      ],
      ov: ['Additional agent build: $2,000 each', 'Additional workflow: $1,000', 'Custom AI model fine-tuning: $5,000', 'Live training call: $250/hr', 'Emergency off-hours: +50%'],
      ex: 'No marketing, no ads, no content creation, no social media management. For those services, see our Marketing Retainers or Social Management packages.',
      ideal: 'Businesses running AI as a core part of daily operations',
    },
  ],
  customSupport: [
    {
      name: 'Hourly Bank',
      price: 2500,
      disp: '$2,500',
      per: '/mo',
      tag: 'Flexible support',
      com: 'Month-to-month (no minimum)',
      scope: [
        { i: 'Choose your hours', l: 'Purchase a block of development hours each month. 10 hrs/mo = $2,500 ($250/hr). 20 hrs/mo = $4,500 ($225/hr). 30 hrs/mo = $6,000 ($200/hr). 40+ hrs/mo = custom rate. Hours cover any combination of: bug fixes, feature updates, design changes, integrations, or consulting.' },
        { i: 'How it works', l: 'You submit requests via a shared task board (Linear, GitHub Issues, or email). We estimate hours before starting each task and get your approval. Work is tracked and reported weekly with a time log showing exactly what was done and how long it took. Unused hours do NOT roll over to the next month.' },
        { i: 'Response time', l: 'Requests acknowledged within 1 business day. Bug fixes prioritized by severity: critical (same-day start), major (within 2 business days), minor (within 5 business days). Feature requests and enhancements scheduled into the current or next billing cycle.' },
        { i: 'Monthly summary', l: 'End-of-month report showing: hours used, tasks completed, hours remaining, and any open items carrying into next month. No surprises.' },
        { i: 'What\u2019s covered', l: 'Bug fixes and patches, minor feature additions, UI/UX improvements, database changes, API updates, third-party integration maintenance, performance optimization, security patches, and consulting. Does NOT include: full feature builds requiring 40+ hours (scoped as a separate project), design-from-scratch work (use our design retainer or project pricing), or 24/7 on-call support.' },
      ],
      ov: ['Hours beyond your bank: $275/hr', 'Emergency/same-day critical fix: +50% on hours used', 'Weekend work: +75% on hours used'],
      ex: 'No guaranteed SLA. No 24/7 monitoring. No dedicated developer (team handles requests in queue). For guaranteed response times and dedicated resources, see Dev Support tiers below.',
      ideal: 'Small apps, tools, or post-launch projects that need occasional updates',
    },
    {
      name: 'Dev Support',
      price: 1500,
      disp: '$1,500',
      per: '/mo',
      tag: 'Keep it running',
      com: '3-month minimum',
      scope: [
        { i: 'Server & infrastructure monitoring', l: '24/7 uptime monitoring with automated alerts. Server health checks: CPU, memory, disk, and response time. If your app goes down, we\u2019re notified immediately and begin investigation within 1 hour during business hours (M\u2013F 9\u20135). Hosting provider coordination if infrastructure issues arise.' },
        { i: 'Security maintenance', l: 'Monthly dependency updates (npm, pip, system packages). Security vulnerability scanning and patching. SSL certificate renewal management. Database backup verification (backups configured during build \u2014 we verify they\u2019re running and test restoration quarterly). Monitoring for unauthorized access attempts.' },
        { i: 'Bug fixes (5 hrs/mo included)', l: '5 hours of bug fix and patch work per month. Covers: broken features, display issues, API errors, and integration failures related to the original build scope. Hours tracked and reported monthly. Bugs caused by third-party API changes or hosting provider issues are covered. Bugs caused by unauthorized code changes (by you or another developer) are billable.' },
        { i: 'Database management', l: 'Monthly database health check: query performance, index optimization, storage usage, and connection pool monitoring. Backup verification and test restoration (quarterly). Data cleanup recommendations if storage grows beyond expected limits. Does NOT include major schema changes or data migrations (quoted separately).' },
        { i: 'Monthly health report', l: 'Report emailed by the 5th of each month covering: uptime percentage, server performance, security patches applied, bugs fixed, backup status, and any recommendations for improvements. Delivered as a PDF or dashboard link.' },
        { i: 'Support channel', l: 'Email support with 24-hour response time (business days). Up to 8 support requests per month. Each request = 1 specific issue or question. Requests beyond 8 billed at $200/hr.' },
      ],
      ov: ['Bug fixes beyond 5hr: $200/hr', 'Emergency off-hours response: +50%', 'Database migration: quoted separately', 'Feature additions: use Hourly Bank or project pricing', 'Performance audit: $2,000 one-time'],
      ex: 'No feature development, no design work, no content updates, no ad management. This is infrastructure and code maintenance only. For active development, see Active Development tier or Hourly Bank.',
      ideal: 'Stable apps that need to stay secure, monitored, and patched',
    },
    {
      name: 'Active Development',
      price: 7500,
      disp: '$7,500',
      per: '/mo',
      tag: 'Continuous improvement',
      pop: true,
      com: '6-month minimum',
      scope: [
        { i: 'Everything in Dev Support', l: 'All monitoring, security, bug fixes (5 hrs), database management, and monthly reporting from Dev Support tier \u2014 included as your baseline.' },
        { i: 'Feature development (35 hrs/mo)', l: '35 dedicated development hours each month for building new features, improving existing ones, or expanding your platform. Hours cover: new features, UI/UX improvements, new integrations, performance optimization, and architecture improvements. Unused hours roll over to next month only (max accumulation: 52 hours).' },
        { i: 'Product roadmap collaboration', l: 'Monthly roadmap review delivered via Loom video covering upcoming features, priorities, and recommendations. We maintain a shared task board (Linear or GitHub Issues) with prioritized items, status tracking, and time estimates. You set priorities via the task board or text \u2014 we advise on technical feasibility, effort, and sequencing. 1 optional live call per month on request (60 min max).' },
        { i: 'Design included', l: '3 hours of design work per month included (UI updates, new screen layouts, component design). Covers: wireframes, mockups, and minor design system updates. Full page or feature redesigns requiring 5+ design hours quoted separately.' },
        { i: 'Bi-weekly demo videos', l: 'Every 2 weeks, we record a Loom demo of completed work and in-progress features. You review on your own time and provide feedback via text, email, or the task board. Keeps the project moving and prevents misalignment \u2014 no live calls needed.' },
        { i: 'Priority support', l: 'Text and email support with 4-hour response time (business days). Critical bugs: same-day start during business hours. Up to 15 support requests per month. All communication via text and email \u2014 no scheduled calls required.' },
        { i: 'Quarterly performance review', l: 'Every 3 months: comprehensive platform audit covering performance (page load times, API response times), security posture, infrastructure costs, and technical debt assessment. Recommendations for optimization delivered as a written report.' },
      ],
      ov: ['Development beyond 35hrs: $225/hr', 'Emergency off-hours: +50%', 'Weekend deployment: +75%', 'Full feature build exceeding 40hrs: scoped as separate project at discounted rate', 'Design beyond 3hrs: $200/hr'],
      ex: 'No 24/7 on-call support. No dedicated full-time developer (shared team with priority access). No mobile app development at this tier (scoped separately). No marketing, ads, or content services \u2014 see our marketing packages for those.',
      ideal: 'Growing platforms that ship new features every month',
    },
  ],
};

/* ──────────────────────────────────────────────────────────────
 * Tiny SVG helpers
 * ────────────────────────────────────────────────────────────── */
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2, color: O }}>
    <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.1" />
    <path d="M5 8.5L7 10.5L11 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chev = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ──────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────── */
interface ScopeItem {
  i: string;
  l: string;
}
interface Package {
  name: string;
  price: number;
  disp: string;
  tag: string;
  pop?: boolean;
  per?: string;
  tl?: string;
  com?: string;
  scope: ScopeItem[];
  ov: string[];
  ho?: string;
  ex?: string;
  bridge?: string;
  ideal: string;
}

/* ──────────────────────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────────────────────── */
export function PricingContent() {
  const [tab, setTab] = useState('aiAgents');
  const [exp, setExp] = useState<number | null>(null);

  const tabs = [
    { k: 'aiAgents', l: 'AI Agents' },
    { k: 'oneTime', l: 'One-Time Projects' },
    { k: 'socialSetup', l: 'Social Setup' },
    { k: 'monthly', l: 'Marketing Retainers' },
    { k: 'social', l: 'Social Management' },
    { k: 'customBuild', l: 'Software Builds' },
    { k: 'customSupport', l: 'Software Retainers' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', fontFamily: "'Outfit', system-ui, sans-serif", color: '#E4E4ED', padding: '32px 14px', paddingTop: '120px' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: `radial-gradient(ellipse at 25% -5%, ${OG} 0%, transparent 55%)` }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: OF, border: '1px solid rgba(249,115,22,0.18)', borderRadius: 100, padding: '6px 16px', marginBottom: 18, fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: O, textTransform: 'uppercase' }}>
            BLOK BLOK STUDIO PACKAGES
          </div>
          <h1 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 'clamp(26px, 4.5vw, 46px)', lineHeight: 1.08, margin: '0 0 12px', letterSpacing: '-1px', background: 'linear-gradient(135deg, #fff, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Clear Scope.{' '}
            <span style={{ background: `linear-gradient(135deg, ${O}, ${GL})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Real Results.</span>
          </h1>
          <p style={{ fontSize: 14, color: MU, maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.6, fontWeight: 300 }}>
            AI-powered websites, automations, ads, and social media management. Transparent pricing, defined deliverables, no surprises.
          </p>
          {/* Tabs — 2-col grid on mobile, inline-flex row on desktop */}
          <style dangerouslySetInnerHTML={{ __html: `
            .pricing-tabs-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:4px;background:rgba(255,255,255,0.03);border:1px solid ${BO};border-radius:12px;padding:3px}
            @media(min-width:700px){.pricing-tabs-grid{display:inline-flex}}
          ` }} />
          <div className="pricing-tabs-grid">
            {tabs.map((t) => (
              <button
                key={t.k}
                onClick={() => { setTab(t.k); setExp(null); }}
                style={{
                  padding: '9px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.3s',
                  background: tab === t.k ? `linear-gradient(135deg, ${O}, ${OD})` : 'transparent',
                  color: tab === t.k ? '#fff' : FA,
                }}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(330px, 100%), 1fr))', gap: 16, marginBottom: 28 }}>
          {pkgData[tab].map((pk, i) => {
            const isE = exp === i;
            return (
              <div key={i} style={{
                background: `linear-gradient(165deg, ${pk.pop ? 'rgba(249,115,22,0.035)' : 'rgba(14,14,22,0.95)'} 0%, rgba(10,10,15,0.98) 100%)`,
                border: pk.pop ? '1.5px solid rgba(249,115,22,0.4)' : `1px solid ${BO}`,
                borderRadius: 16, padding: '24px 20px', display: 'flex', flexDirection: 'column', position: 'relative',
                boxShadow: pk.pop ? `0 6px 32px ${OG}` : '0 2px 10px rgba(0,0,0,0.25)',
              }}>
                {pk.pop && (
                  <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${O}, ${OL})`, color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 14px', borderRadius: '0 0 8px 8px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    MOST POPULAR
                  </div>
                )}
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: O, marginBottom: 6, opacity: 0.65 }}>{pk.tag}</span>
                <h2 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 22, margin: '0 0 4px' }}>{pk.name}</h2>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 34, background: `linear-gradient(135deg, #fff, ${OL})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{pk.disp}</span>
                  {pk.per && <span style={{ fontSize: 13, color: FA }}>{pk.per}</span>}
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: 12 }} />

                {/* Scope */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {pk.scope.map((s, j) => (
                    <div key={j} style={{ display: 'flex', gap: 7 }}>
                      <Check />
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#c8c8d8' }}>{s.i}</span>
                        <span style={{ fontSize: 11, color: MU, fontWeight: 300, display: 'block', marginTop: 1, lineHeight: 1.45 }}>{s.l}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expand */}
                <button onClick={() => setExp(isE ? null : i)} style={{ marginTop: 14, width: '100%', padding: '8px', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontWeight: 600, fontFamily: 'inherit', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: MU, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Chev open={isE} /> {isE ? 'Hide' : 'View'} Overages, Boundaries{pk.bridge ? ' & Retainer Bridge' : ''}
                </button>
                {isE && (
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Overages */}
                    <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)', borderRadius: 10, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: WA, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>OVERAGE RATES</div>
                      {pk.ov.map((o, j) => (
                        <div key={j} style={{ fontSize: 11, color: '#b0b0c0', lineHeight: 1.7, paddingLeft: 8, borderLeft: '2px solid rgba(239,68,68,0.15)', marginBottom: 3 }}>{o}</div>
                      ))}
                    </div>
                    {/* Handoff / Exclusions */}
                    <div style={{ background: OF, border: '1px solid rgba(249,115,22,0.1)', borderRadius: 10, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: O, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>
                        {pk.ho ? 'HANDOFF & COMPLETION' : 'EXCLUSIONS'}
                      </div>
                      <div style={{ fontSize: 11, color: MU, lineHeight: 1.6 }}>{pk.ho || pk.ex}</div>
                    </div>
                    {/* Bridge to Monthly */}
                    {pk.bridge && (
                      <div style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: 10, padding: '12px 14px' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: PR, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>
                          WHAT HAPPENS AFTER LAUNCH
                        </div>
                        <div style={{ fontSize: 11, color: MU, lineHeight: 1.6 }}>{pk.bridge}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Meta */}
                <div style={{ marginTop: 14, padding: '10px 0 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                  {pk.tl && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: FA }}>Timeline</span>
                      <span style={{ fontSize: 11, color: MU, fontWeight: 600 }}>{pk.tl}</span>
                    </div>
                  )}
                  {pk.com && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: FA }}>Commitment</span>
                      <span style={{ fontSize: 11, color: MU, fontWeight: 600 }}>{pk.com}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: FA }}>Ideal for</span>
                    <span style={{ fontSize: 10, color: '#666', textAlign: 'right', maxWidth: '62%' }}>{pk.ideal}</span>
                  </div>
                </div>

                <a href="/contact" style={{ marginTop: 14, width: '100%', padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, fontFamily: 'inherit', background: pk.pop ? `linear-gradient(135deg, ${O}, ${OD})` : 'rgba(255,255,255,0.04)', color: pk.pop ? '#fff' : '#aaa', boxShadow: pk.pop ? `0 4px 18px ${OG}` : 'none', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                  Start This Package {'\u2192'}
                </a>
              </div>
            );
          })}
        </div>

        {/* Social Media A La Carte */}
        {(tab === 'socialSetup' || tab === 'social') && (
          <div style={{ background: 'rgba(255,255,255,0.015)', border: `1px solid ${BO}`, borderRadius: 14, padding: '22px 18px', marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 17, marginBottom: 4 }}>
              Social Media Add-Ons{' '}
              <span style={{ fontSize: 12, fontWeight: 400, color: MU }}>(per platform, per month)</span>
            </h3>
            <p style={{ fontSize: 11, color: FA, marginBottom: 16 }}>Add to any package, or purchase standalone. Retainer clients get reduced rates. Add-ons include content creation and basic engagement only &mdash; no strategy, reporting, or calendars. For full-service social with strategy, see our Social Management tab.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {([
                ['Instagram', '$950/mo', '$600/mo', '8 posts + 4 stories + engagement'],
                ['LinkedIn', '$1,050/mo', '$650/mo', '8 posts + connection outreach + engagement'],
                ['TikTok', '$1,100/mo', '$700/mo', '8 posts (4 video) + trend monitoring'],
                ['YouTube Shorts', '$750/mo', '$450/mo', '4 Shorts/mo from existing footage'],
                ['Facebook', '$750/mo', '$450/mo', '8 posts + community engagement'],
                ['X / Twitter', '$750/mo', '$450/mo', '12 posts + engagement + monitoring'],
                ['Pinterest', '$650/mo', '$400/mo', '20 pins/mo + board strategy'],
              ] as const).map(([n, standalone, retainer, d], idx) => (
                <div key={idx} style={{ padding: '12px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.025)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#bbb' }}>{n}</span>
                    <span style={{ fontSize: 13, color: PR, fontWeight: 700, whiteSpace: 'nowrap' }}>{retainer}</span>
                  </div>
                  <div style={{ fontSize: 10, color: FA, lineHeight: 1.4, marginBottom: 4 }}>{d}</div>
                  <div style={{ fontSize: 10, color: '#666' }}>
                    Standalone: <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>{standalone}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.12)', fontSize: 11, color: MU, lineHeight: 1.6 }}>
                <strong style={{ color: PR }}>Retainer pricing</strong> applies to clients on any active monthly retainer (Maintain &amp; Monitor, Growth Engine, or Full Partnership). Standalone pricing applies to all other clients.
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 8, background: OF, border: '1px solid rgba(249,115,22,0.1)', fontSize: 11, color: MU, lineHeight: 1.6 }}>
                <strong style={{ color: OL }}>Bundle discount:</strong> 3+ platforms = 10% off total. 5+ platforms = 15% off. All social add-ons require 3-month minimum. Content revisions: 1 round per batch. Additional round: $175.
              </div>
            </div>
          </div>
        )}

        {/* YouTube Management - Standalone */}
        {tab === 'social' && (
          <div style={{ background: 'rgba(255,255,255,0.015)', border: `1px solid ${BO}`, borderRadius: 14, padding: '22px 18px', marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 17, marginBottom: 4 }}>
              YouTube Management{' '}
              <span style={{ fontSize: 12, fontWeight: 400, color: MU }}>(standalone or add to any social tier)</span>
            </h3>
            <p style={{ fontSize: 11, color: FA, marginBottom: 16 }}>YouTube requires a different skill set than social media &mdash; long-form editing, SEO, thumbnails, and channel strategy. These packages can be purchased standalone or added to any social management tier.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 12 }}>
              {[
                {
                  name: 'YouTube Essentials',
                  price: '$1,500/mo',
                  items: [
                    '4 videos/mo edited from your raw footage (up to 10 min each)',
                    'Custom thumbnail designed for each video',
                    'SEO-optimized titles, descriptions, and tags',
                    'Playlist organization and end screen/card setup',
                    'Monthly analytics report (views, watch time, CTR, subscribers)',
                    '1 round of revisions per video',
                  ],
                  note: 'You provide raw footage (phone, screen recording, interviews). We handle all editing, graphics, and optimization. We do not script or shoot.',
                },
                {
                  name: 'YouTube Growth',
                  price: '$3,000/mo',
                  pop: true,
                  items: [
                    '8 videos/mo edited (up to 15 min each)',
                    '2 YouTube Shorts/mo repurposed from long-form content',
                    'Custom thumbnails with A/B testing (2 options per video)',
                    'Full SEO: titles, descriptions, tags, chapters, and timestamps',
                    'Channel strategy: content calendar, topic research, and competitor analysis',
                    'Community tab management (2 posts/week)',
                    'Monthly analytics report with growth recommendations',
                    '1 monthly Loom strategy update',
                    '2 rounds of revisions per video',
                  ],
                  note: 'Includes everything in Essentials plus strategic growth. Best for channels publishing 2x/week that want to grow subscribers and watch time.',
                },
              ].map((yt, idx) => (
                <div key={idx} style={{ padding: '18px 16px', borderRadius: 10, background: yt.pop ? 'rgba(249,115,22,0.03)' : 'rgba(255,255,255,0.01)', border: yt.pop ? '1.5px solid rgba(249,115,22,0.3)' : '1px solid rgba(255,255,255,0.04)', position: 'relative' }}>
                  {yt.pop && (
                    <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${O}, ${OL})`, color: '#fff', fontSize: 8, fontWeight: 800, padding: '2px 10px', borderRadius: '0 0 6px 6px', letterSpacing: '1.2px', textTransform: 'uppercase' }}>RECOMMENDED</div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#ddd' }}>{yt.name}</span>
                    <span style={{ fontSize: 14, color: O, fontWeight: 800 }}>{yt.price}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                    {yt.items.map((item, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, fontSize: 11, color: MU, lineHeight: 1.5 }}>
                        <Check />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '8px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)', fontSize: 10, color: FA, lineHeight: 1.5, fontStyle: 'italic' }}>
                    {yt.note}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ padding: '10px 14px', borderRadius: 8, background: OF, border: '1px solid rgba(249,115,22,0.1)', fontSize: 11, color: MU, lineHeight: 1.6 }}>
                <strong style={{ color: OL }}>Overages:</strong> Extra videos beyond monthly limit: $300 each. Extra Shorts: $150 each. Extra thumbnail A/B test: $75. Additional revision round: $175. Video shooting/production: quoted separately. YouTube Ads management: add from Marketing Retainers tab.
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.12)', fontSize: 11, color: MU, lineHeight: 1.6 }}>
                <strong style={{ color: PR }}>Bundle with social:</strong> Add YouTube Essentials to any social tier for $1,200/mo (save $300). Add YouTube Growth for $2,600/mo (save $400). 6-month minimum commitment.
              </div>
            </div>
          </div>
        )}

        {/* General Add-Ons - Marketing */}
        {tab !== 'customBuild' && tab !== 'customSupport' && tab !== 'aiAgents' && (
          <div style={{ background: 'rgba(255,255,255,0.015)', border: `1px solid ${BO}`, borderRadius: 14, padding: '22px 18px', marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 17, marginBottom: 2 }}>General Add-Ons</h3>
            <p style={{ fontSize: 10, color: FA, marginBottom: 16 }}>Enhance any package with these services</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 5 }}>
              {([
                ['Additional Pages', '$500/pg'], ['E-Commerce (Shopify)', '$3,000'],
                ['AI Voice Agent', '$1,500'], ['Email Sequences', '$1,200'],
                ['Brand Video (30s)', '$1,800'], ['Pitch Deck', '$1,500'],
                ['Landing Page', '$1,400'], ['SMS Campaign', '$1,000'],
                ['CRM Migration', '$1,800'], ['API Integration', '$2,500+'],
                ['Strategy Session', '$500'], ['Copywriting', '$200/pg'],
              ] as const).map(([n, p], idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 11px', borderRadius: 7, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.025)' }}>
                  <span style={{ fontSize: 11, color: '#999' }}>{n}</span>
                  <span style={{ fontSize: 11, color: O, fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 6 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Agent Types — A La Carte */}
        {tab === 'aiAgents' && (
          <div style={{ background: 'rgba(255,255,255,0.015)', border: `1px solid ${BO}`, borderRadius: 14, padding: '22px 18px', marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 17, marginBottom: 4 }}>
              AI Agent Types{' '}
              <span style={{ fontSize: 12, fontWeight: 400, color: MU }}>(individual agents)</span>
            </h3>
            <p style={{ fontSize: 11, color: FA, marginBottom: 16 }}>Each agent is custom-built for your business. All agents are $5,000 and include deployment, testing, documentation, and 30-day support. Add API integration to any agent for $3,000.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {([
                ['Voice Agent', 'Answers inbound calls, qualifies leads, books appointments, transfers to humans when needed. Custom scripts and call routing.'],
                ['Email Agent', 'Reads, categorizes, drafts, and sends emails based on triggers. Handles follow-ups, sequences, and auto-responses with your brand voice.'],
                ['Web Scraping Agent', 'Extracts structured data from websites on a schedule. Monitors competitors, tracks prices, gathers leads, or pulls research data into your systems.'],
                ['PDF Generator Agent', 'Auto-generates branded PDFs from your data — proposals, invoices, reports, contracts, or summaries. Triggered by form submissions, CRM events, or schedules.'],
                ['Customer Support Agent', 'AI chatbot trained on your knowledge base. Handles FAQs, troubleshooting, returns, and escalations. Embedded on your site or connected to live chat.'],
                ['Lead Qualification Agent', 'Scores and routes inbound leads based on custom criteria. Integrates with your CRM to auto-tag, prioritize, and trigger follow-up sequences.'],
                ['Appointment Booking Agent', 'Handles scheduling via chat, voice, or SMS. Syncs with Google Calendar, Calendly, or your booking system. Sends reminders and handles rescheduling.'],
                ['Data Processing Agent', 'Ingests raw data (CSVs, forms, emails, docs), cleans it, transforms it, and pushes structured output to your database, dashboard, or spreadsheet.'],
                ['Content Generation Agent', 'Creates blog drafts, social captions, product descriptions, or ad copy on demand. Trained on your brand voice, style guide, and past content.'],
                ['Social Monitoring Agent', 'Tracks brand mentions, competitor activity, and industry trends across social platforms. Sends alerts and compiles daily/weekly digests.'],
              ] as const).map(([n, d], idx) => (
                <div key={idx} style={{ padding: '12px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.025)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#bbb' }}>{n}</span>
                    <span style={{ fontSize: 13, color: O, fontWeight: 700, whiteSpace: 'nowrap' }}>$5,000</span>
                  </div>
                  <div style={{ fontSize: 10, color: FA, lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
              <div style={{ padding: '12px 14px', borderRadius: 8, background: 'rgba(249,115,22,0.03)', border: '1px solid rgba(249,115,22,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#bbb' }}>API Integration</span>
                  <span style={{ fontSize: 13, color: PR, fontWeight: 700, whiteSpace: 'nowrap' }}>+$3,000</span>
                </div>
                <div style={{ fontSize: 10, color: FA, lineHeight: 1.5 }}>Connect any agent to external APIs, third-party services, or custom backends. Includes: authentication, data mapping, error handling, retry logic, and documentation.</div>
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.12)', fontSize: 11, color: MU, lineHeight: 1.6 }}>
                <strong style={{ color: PR }}>Bundle &amp; save:</strong> Individual agents purchased as part of an Agent Team ($8,500) or AI Operations ($15,000+) package include reduced per-agent pricing and shared integrations.
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 8, background: OF, border: '1px solid rgba(249,115,22,0.1)', fontSize: 11, color: MU, lineHeight: 1.6 }}>
                <strong style={{ color: OL }}>Don&apos;t see your use case?</strong> We build custom agents for any workflow. Text us or fill out a quick form and we&apos;ll scope it for free.
              </div>
            </div>
          </div>
        )}

        {/* General Add-Ons - Custom Builds */}
        {(tab === 'customBuild' || tab === 'customSupport') && (
          <div style={{ background: 'rgba(255,255,255,0.015)', border: `1px solid ${BO}`, borderRadius: 14, padding: '22px 18px', marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 17, marginBottom: 2 }}>Development Add-Ons</h3>
            <p style={{ fontSize: 10, color: FA, marginBottom: 16 }}>Available with any custom build or dev retainer</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 5 }}>
              {([
                ['API Integration', '$3,000'], ['Payment Processing (Stripe)', '$4,000'],
                ['User Auth & Roles', '$3,000'], ['Email/SMS Notifications', '$1,500'],
                ['File Upload System', '$2,000'], ['Search & Filtering', '$2,500'],
                ['Analytics Dashboard', '$5,000'], ['AI Chat Agent', '$5,000'],
                ['Mobile App (React Native)', '$30,000'], ['Database Migration', '$5,000'],
                ['Performance Audit', '$2,000'], ['Security Audit', '$4,000'],
                ['Third-Party Pen Test Coord.', '$5,000'], ['White-Label / Multi-Tenant', '$15,000'],
                ['CI/CD Pipeline Setup', '$2,500'], ['Strategy / Consulting', '$300/hr'],
              ] as const).map(([n, p], idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 11px', borderRadius: 7, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.025)' }}>
                  <span style={{ fontSize: 11, color: '#999' }}>{n}</span>
                  <span style={{ fontSize: 11, color: O, fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 6 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: OF, border: '1px solid rgba(249,115,22,0.1)', fontSize: 11, color: MU, lineHeight: 1.6 }}>
              <strong style={{ color: OL }}>All pricing is firm.</strong> Exact scope and deliverables are confirmed during the Discovery &amp; Scoping phase ($2,500). Every custom build starts with Discovery to define what&apos;s included at the quoted price.
            </div>
          </div>
        )}

        <p style={{ textAlign: 'center', fontSize: 9, color: '#2a2a35', marginTop: 24, fontWeight: 300 }}>
          All prices USD. Ad spend billed separately. | Blok Blok Studio
        </p>
      </div>
    </div>
  );
}
