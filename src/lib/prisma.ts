import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as { prisma: InstanceType<typeof PrismaClient> };

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');

  // Two shapes of URL both have to work. postgres://...@db.prisma.io:5432 is
  // a real TCP connection and needs the pg adapter. prisma+postgres://... is
  // Prisma's own HTTPS transport, which the adapter cannot parse at all — it
  // has no host, user or password in it — so that one goes to the default
  // client via accelerateUrl. Branching here means the connection string can be swapped in
  // Vercel without a code change, which matters when one of them stops
  // authenticating.
  if (connectionString.startsWith('prisma+postgres://')) {
    return new PrismaClient({ accelerateUrl: connectionString });
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

function getLazyPrisma(): InstanceType<typeof PrismaClient> {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as InstanceType<typeof PrismaClient>, {
  get(_target, prop) {
    return (getLazyPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
