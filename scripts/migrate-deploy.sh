#!/bin/sh
# Applies pending migrations during the Vercel build, before next build runs.
#
# Production only. Preview deployments share this project's single
# DATABASE_URL with production, so migrating on a preview would change the
# production schema before the code is merged.
#
# Uses DIRECT_DATABASE_URL, not DATABASE_URL. The build sandbox cannot reach
# db.prisma.io:5432 — verified: it fails P1001 exactly like a laptop does,
# even though the deployed functions connect fine at runtime. The
# prisma+postgres:// URL tunnels over 443 and works from both.
#
# If that variable is missing the build continues without migrating. A
# missing credential is a configuration gap, not a broken release, and
# taking the whole site down for it would be the wrong trade. A migration
# that actually fails still fails the build, which is the case that matters.
set -e

if [ "$VERCEL_ENV" != "production" ]; then
  echo "[migrate] VERCEL_ENV=${VERCEL_ENV:-local} — skipping (production only)"
  exit 0
fi

if [ -z "$DIRECT_DATABASE_URL" ]; then
  echo "[migrate] WARNING: DIRECT_DATABASE_URL is not set — skipping migrations."
  echo "[migrate] Set it in Vercel (the prisma+postgres:// string) to enable this."
  exit 0
fi

echo "[migrate] applying pending migrations over the 443 tunnel"
DATABASE_URL="$DIRECT_DATABASE_URL" npx prisma migrate deploy
