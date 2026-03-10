import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL not set');
  const adapter = new PrismaPg({ connectionString });
  const p = new PrismaClient({ adapter });
  
  console.log('Leads:', await p.lead.count());
  await p.leadListMember.deleteMany({});
  await p.lead.deleteMany({});
  console.log('Wiped. Remaining:', await p.lead.count());
  await p.$disconnect();
}

main();
