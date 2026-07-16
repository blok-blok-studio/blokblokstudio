# Paid Ads → Sales Flow Playbook

The complete flow from ad click to closed deal. Built July 2026.

## The funnel map

```
Meta / Google ad
      │
      ▼
/go  (landing page: lead form — name, email, phone, business, service)
      │  POST /api/call (source: "ads", UTM + click IDs captured)
      │       ├── saved to site DB (Lead, source "ads")
      │       └── pushed to Client Job Tracker → PROSPECT client + 🔥 Slack alert
      ▼
CONVERSION PAGE (auto-routed by click source)
      │   fbclid / utm_source=meta   → /go/thanks/meta    (fires Meta "Lead")
      │   gclid  / utm_source=google → /go/thanks/google  (fires Google conversion)
      │   direct / unknown           → /go/thanks         (fires both, guarded)
      │  primary CTA: book 15-min intro call (cal.com/chasehaynes/discovery)
      │  secondary: WhatsApp for instant contact
      ▼
INTRO CALL — the SETTER call (15 min, discovery)
      │  qualify, build trust, book the strategy call
      ▼
STRATEGY CALL — the CLOSER call (cal.com/chasehaynes/strategy)
      │  present growth plan, scope, price → close
      ▼
Client onboarding (/onboard flow → tracker)
```

Organic traffic runs the same play through `/call` (the BANT self-qualification funnel) —
ads traffic skips the long form because every field of friction costs paid leads.

## Why this shape (research-backed)

- **Landing page over Meta Instant Forms** for high-ticket services: instant forms produce
  30–45% cheaper leads but 35–55% worse qualified-lead conversion. When a bad lead costs a
  sales call, quality wins.
- **The thank-you page is the conversion event.** Both Meta and Google optimize toward
  `/go/thanks` views — cleanest signal, no code changes needed per campaign.
- **Speed to lead is the biggest lever:** leads contacted within 5 minutes convert at
  multiples of leads contacted hours later. The tracker fires a Slack alert the second a
  lead arrives — act on it.
- **Setter/closer split:** the 15-min intro (setter) filters tire-kickers cheaply so the
  strategy call (closer) only runs against qualified prospects. Industry benchmark: 25–40%
  of intro calls should produce a strategy call booking; 20–25% of strategy calls should close.

## Roles

| Role | Call | Length | Job |
|---|---|---|---|
| Setter | Intro / discovery (`cal.com/chasehaynes/discovery`) | 15 min | Qualify, build rapport, book the strategy call on the spot |
| Closer | Strategy (`cal.com/chasehaynes/strategy`) | 30–45 min | Present the growth plan, handle objections, close |

Solo mode: same person, two calls. The split still matters — never sell on the intro call.

## Setter call script (15 min)

1. **Frame (1 min):** "This is a quick 15 minutes so I understand your business — if it makes
   sense, the next step is a strategy call where we bring you an actual plan."
2. **Situation (5 min):** What's the business? Where do customers come from today? What's the
   website/ads/social situation? (Their form answers + tracker notes are pre-loaded — reference them.)
3. **Problem (4 min):** What made you click the ad? What's it costing you? (money, hours, missed leads)
4. **Qualify (3 min):** Budget comfort range · decision maker(s) · timeline. Disqualify politely
   if there's no budget or no need — offer the newsletter.
5. **Book (2 min):** Book the strategy call WHILE ON the intro call. Never "I'll send a link."

## Closer call structure (30–45 min)

1. Recap what the setter learned — show you listened.
2. Diagnose live: their site, their ads, their socials, in front of them.
3. Present the growth plan: 3 concrete moves, in order, with expected outcomes.
4. Scope + price (anchor with the packages from /pricing). One recommendation, not a menu.
5. Ask for the business. Silence after the ask.
6. If yes → send contract + invoice from the tracker same day. If "need to think" → book the
   follow-up before hanging up.

## Follow-up cadence (leads that don't book)

- 0 min — Slack alert → WhatsApp/call if phone provided (speed to lead!)
- +1 h — email 1: "Got your request, here's the booking link" (personal, 3 sentences)
- +1 day — email 2: relevant case study (Coach Kofi 200% consultations)
- +3 days — email 3: "Should I close your file?" breakup email
- No-show: same-day reschedule text + email, one more attempt next day.

## Meta Ads setup

1. **Pixel:** create in Events Manager → set `NEXT_PUBLIC_META_PIXEL_ID` on the site's Vercel
   project. Loads only after marketing-cookie consent (GDPR), with Meta's consent API signaled.
   **Conversions API:** generate an access token in Events Manager → Settings → set
   `META_CAPI_ACCESS_TOKEN`. The server then fires a duplicate-proof Lead event (shared
   event_id with the browser pixel) with hashed email/phone for match quality — this is what
   keeps attribution alive through iOS/ad-blocker signal loss.
2. **Campaign:** Sales objective (website conversions), conversion event = **Lead**
   (fires on `/go/thanks/meta`; you can also add a custom conversion on that URL).
   One campaign → Advantage+ placements → 1–2 ad sets max
   (broad + retargeting once the pixel has data).
3. **Creative:** 3–5 variants; lead with the client results ("200% more consultations").
   Video/reel format outperforms static for service businesses.
4. **URL template:** `https://blokblokstudio.com/go?utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`
   (fbclid is appended automatically; the form captures everything into the tracker notes).
5. **Budget:** start €30–50/day, judge nothing before 50 conversions or 2 weeks.

## Google Ads setup

0. **Consent Mode v2 is built in:** the tag boots with all four consent signals defaulted to
   `denied` and updates to `granted` on cookie-banner acceptance — required by Google's EU
   User Consent Policy for any EU-targeted campaign.
1. **Google tag:** create conversion action "Lead" (page view of `/go/thanks/google`) →
   set `NEXT_PUBLIC_GOOGLE_ADS_ID` (AW-…) on the site's Vercel project. Optional:
   set `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION` (AW-…/label) to fire the exact conversion
   event instead of relying on the page-view rule.
2. **Campaign:** Search, exact/phrase keywords with buying intent: "webdesign agentur berlin",
   "website erstellen lassen berlin", "google ads agentur berlin", "ki automatisierung agentur".
   Skip Performance Max until Search proves the offer.
3. **Ads → `/go`** with `?utm_source=google&utm_medium=cpc&utm_campaign=...` (gclid auto-appends).
4. **Negative keywords from day one:** kostenlos, job, praktikum, kurs, selber machen.

## Metrics that matter (weekly)

| Metric | Healthy |
|---|---|
| Landing page conversion (form / visits) | 10–20% |
| Cost per lead | €15–40 (Berlin services) |
| Lead → intro call booked | 30–45% |
| Intro → strategy call | 25–40% |
| Strategy call → close | 20–25% |
| Speed to first contact | < 5 min |

Every lead's ad attribution (UTM, gclid/fbclid) is in its tracker notes — after ~20 leads,
kill the campaigns/ads that produce leads who never book.

## Wiring reference

- Lead intake: site `/api/call` → tracker `POST /api/leads/intake` (header `X-Webhook-Secret`,
  env `TRACKER_WEBHOOK_URL/SECRET` on the site, `LEAD_WEBHOOK_SECRET` on the tracker)
- Slack alert: fires from the tracker intake route via `SLACK_WEBHOOK_URL`
- Pixels: `src/components/AdsPixels.tsx`, consent-gated, env-driven, no-op until IDs are set
- Conversion events: `src/components/GoThanksContent.tsx` (platform prop per page)
- `/go` + all `/go/thanks*` pages are `noindex` and excluded from the sitemap on purpose
