import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';
import { faker } from '@faker-js/faker';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
});

async function generate() {
  console.time('Seeding Database');
  console.log('Seeding begins...');

  for (let i = 0; i <= 2; i++) {
    faker.seed(i);

    const member = {
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
    };
    const bookTitle = faker.book.title();
    const bookAuthor = faker.person.fullName();
    const bookPublishedYear = faker.number.int({ min: 1900, max: 2024 });
    const bookPublisher = faker.company.name();
    const bookPublisherCity = faker.location.city();

    await prisma.member.upsert({
      where: { email: member.email },
      update: {},
      create: {
        ...member,
        borrowedBooks: {
          connectOrCreate: [
            {
              where: {
                title_author_publishedYear: {
                  title: bookTitle,
                  author: bookAuthor,
                  publishedYear: bookPublishedYear,
                },
              },
              create: {
                title: bookTitle,
                author: bookAuthor,
                publishedYear: bookPublishedYear,
                publisher: {
                  connectOrCreate: {
                    where: { name: bookPublisher },
                    create: {
                      name: bookPublisher,
                      city: bookPublisherCity,
                    },
                  },
                },
              },
            },
          ],
        },
      },
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
