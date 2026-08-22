#!/bin/sh
# Applies pending migrations during the Vercel build, before next build runs.
#
# Production only. Preview deployments share this project's single
# DATABASE_URL with production, so migrating on a preview would change the
# production schema before the code is merged. A preview that needs a new
# column will fail loudly instead, which is the correct signal.
#
# Runs before the build so a failed migration fails the deploy rather than
# shipping code against a schema that was never updated.
set -e

if [ "$VERCEL_ENV" = "production" ]; then
  echo "[migrate] VERCEL_ENV=production — applying pending migrations"
  npx prisma migrate deploy
else
  echo "[migrate] VERCEL_ENV=${VERCEL_ENV:-local} — skipping (production only)"
fi
