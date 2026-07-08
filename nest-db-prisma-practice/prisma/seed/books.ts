import { PrismaClient } from '../../src/generated/prisma/client';
import { SeedHandler } from '../types';

export const books = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    publishedYear: 2008,
    publisherId: '6c25a6ed-7f1b-4690-8ef7-674a98f2fe72',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    publishedYear: 1999,
    publisherId: '6c25a6ed-7f1b-4690-8ef7-674a98f2fe72',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-345678901234',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    publishedYear: 1994,
    publisherId: 'db54861c-8049-4c30-99fc-a2557efb336a',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const generateBooks = async (
  prisma: PrismaClient,
  generate: (
    data: typeof books,
    seedHandler: SeedHandler<(typeof books)[number]>,
  ) => Promise<void>,
) => {
  const cat = await prisma.category.findMany();
  await generate(books, (data) =>
    prisma.book.upsert({
      where: { id: data.id },
      create: {
        ...data,
        categories: { connect: [{ id: cat[0].id }, { id: cat[1].id }] },
      },
      update: {
        ...data,
        categories: {
          set: [],
          connect: [{ id: cat[0].id }, { id: cat[1].id }],
        },
      },
    }),
  );
};
