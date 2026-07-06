import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';
import { members } from './seed/members';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
});

type SeedHandler<T> = (item: T) => Promise<unknown>;

async function generate<T>(data: T[], handler: SeedHandler<T>) {
  console.time('Seeding Database');
  console.log('Seeding begins...');

  for (const item of data) {
    await handler(item);
  }

  console.log('Seeding end and successful!');
  console.timeEnd('Seeding Database');
}

async function seed() {
  await generate(members, (member) =>
    prisma.member.upsert({
      where: { email: member.email },
      create: member,
      update: member,
    }),
  );
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
