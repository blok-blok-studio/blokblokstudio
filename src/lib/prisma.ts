import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as { prisma: InstanceType<typeof PrismaClient> };

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');
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
