import { CreateBookDTO } from './dto/createBook.dto';

export interface IBookRepository {
  save(payload: CreateBookDTO): CreateBookDTO;
}

export class MockBookRepository implements IBookRepository {
  private mockBooks: CreateBookDTO[] = [];

  save(payload: CreateBookDTO): CreateBookDTO {
    this.mockBooks.push(payload);
    return payload;
  }
}
