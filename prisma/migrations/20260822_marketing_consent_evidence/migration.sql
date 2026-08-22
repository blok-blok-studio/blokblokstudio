-- Art. 7(1) evidence for the marketing opt-in itself, not just its confirmation.
--
-- Purely additive: three nullable columns on an existing table. No data is
-- read, moved, defaulted or dropped, and existing rows are unaffected — they
-- simply carry NULL, which correctly represents "we did not record this at
-- the time". Safe to run against the live database while it is serving.
--
-- Rolling back is the three matching DROP COLUMN statements at the bottom,
-- but note that dropping them discards consent evidence, so prefer leaving
-- them in place.

ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "marketingConsentAt"   TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "marketingConsentIp"   TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "marketingConsentText" TEXT;

-- Rollback (do not run unless you mean it):
-- ALTER TABLE "Lead" DROP COLUMN IF EXISTS "marketingConsentAt";
-- ALTER TABLE "Lead" DROP COLUMN IF EXISTS "marketingConsentIp";
-- ALTER TABLE "Lead" DROP COLUMN IF EXISTS "marketingConsentText";
