import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
});

async function generate() {
  const books = [
    {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      publishedYear: 2008,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt & David Thomas',
      publishedYear: 1999,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'c3d4e5f6-a7b8-9012-cdef-345678901234',
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
      publishedYear: 1994,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  console.time('Seeding Database');
  console.log('Seeding begins...');
  for (const b of books) {
    await prisma.book.upsert({
      where: { id: b.id },
      update: { updatedAt: new Date().toISOString() },
      create: b,
    });
  }
  console.log('Seeding end and successful!');
  console.timeEnd('Seeding Database');
}

generate()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
