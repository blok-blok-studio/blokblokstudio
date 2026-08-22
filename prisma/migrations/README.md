# Migrations

The database predates this directory: it was built with `prisma db push`, so
`0_init` is a baseline generated from the schema as it already stood, not a
migration anyone ran. It has to be marked as applied once, after which normal
migration flow takes over.

## Baselining (one time)

```bash
npx prisma migrate resolve --applied 0_init
```

This creates `_prisma_migrations` and records `0_init` without executing it.
It needs database access — see the note at the bottom.

## Day to day

```bash
npm run migrate:new -- --name add_something   # writes the SQL, applies nothing
npm run migrate:status                        # what is pending
```

Review the generated SQL, commit it, and push. Vercel applies it during the
production build, before `next build`, so a failed migration fails the deploy
rather than shipping code against a schema that was never updated. See
`scripts/migrate-deploy.sh`.

Never run `prisma db push` against this project again. It applies changes
with no record, which is how the directory ended up empty in the first place.

## Previews do not migrate

This project has one `DATABASE_URL`, shared by production and preview. If
previews migrated, the production schema would change before the code
merged. They skip it instead, so a preview needing a new column fails
loudly. That is the intended signal.

## Reaching the database

`db.prisma.io:5432` is not reachable from Chase's machine: TCP connects and
the Postgres session is then reset, identically through pg, through relaxed
TLS, and through Prisma's own CLI. Port 443 to the same host is fine and
Vercel connects without trouble.

For anything needing direct access, use the `prisma+postgres://` connection
string from the Prisma Console, which tunnels over 443. Keep it in
`.env.local` as `DIRECT_DATABASE_URL` and pass it explicitly:

```bash
DATABASE_URL="$DIRECT_DATABASE_URL" npx prisma migrate status
```
