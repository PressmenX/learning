import { Book } from './interfaces/book.interface';

export interface IBookRepository {
  save(payload: Book): Book;
}

export class MockBookRepository implements IBookRepository {
  private mockBooks: Book[] = [];

  save(payload: Book): Book {
    this.mockBooks.push(payload);
    return payload;
  }
}
