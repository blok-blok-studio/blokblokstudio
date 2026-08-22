# Marketing consent evidence — how to apply

Adds three nullable columns to `Lead`: `marketingConsentAt`,
`marketingConsentIp`, `marketingConsentText`. Purely additive. Existing rows
are untouched and simply carry NULL, which correctly means "not recorded at
the time".

**This branch must not be merged until the columns exist.** Prisma's default
`upsert` returns every scalar field, so the code would `SELECT` columns that
are not there and the live lead form would start failing.

## Apply it

From a machine that can reach the database (this repo's `DATABASE_URL` points
at Prisma Postgres, and the direct connection was unreachable from Chase's
machine on 22 Aug 2026 — TCP connects, the Postgres TLS session resets):

```bash
npx prisma db execute \
  --file prisma/migrations/20260822_marketing_consent_evidence/migration.sql \
  --schema prisma/schema.prisma
```

Or paste `migration.sql` into the SQL editor in the Prisma Console
(console.prisma.io → your database → Query).

## Check it worked

```sql
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'Lead' AND column_name LIKE 'marketingConsent%'
ORDER BY column_name;
```

Expect five rows: `marketingConsent`, `marketingConsentAt`,
`marketingConsentConfirmed`, `marketingConsentConfirmedAt`,
`marketingConsentIp`, `marketingConsentText`.

## Then

```bash
git checkout main && git merge gdpr-consent-evidence && git push
```

## What starts being recorded

Only for people who tick the optional marketing box, from that submission on:

- `marketingConsentAt` — when they ticked it
- `marketingConsentIp` — the IP it came from, same value already stored as `consentIp`
- `marketingConsentText` — the exact sentence shown, prefixed with its version

The wording lives in `src/data/consent-text.ts` and is written server-side,
never taken from the request body. Reword it by adding a new version there
rather than editing the existing one, so older rows keep saying what those
people actually agreed to.
