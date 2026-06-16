import { Author } from './interfaces/author.interface';

export interface IAuthorRepository {
  findOne(id: string): Author | null;
}

export class MockAuthorRepository implements IAuthorRepository {
  private mockAuthors: Author[] = [
    {
      id: 'a-1',
      name: 'Setyo Purnaman',
    },
    {
      id: 'a-2',
      name: 'Budi Yonoko',
    },
  ];

  findOne(id: string): Author | null {
    const author = this.mockAuthors.find((a) => a.id === id);
    if (!author) return null;
    return author;
  }
}
