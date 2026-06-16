import { Inject, Injectable } from '@nestjs/common';
import { type IBookRepository } from '../book.repository';
import { GetByAuthorIdUseCase } from 'src/author/use-cases/get-by-author-id.use-case';
import { CreateBookDTO } from '../dto/createBook.dto';

@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject('BOOK_REPO_TOKEN')
    private readonly bookRepo: IBookRepository,
    private readonly getByAuthorId: GetByAuthorIdUseCase,
  ) {}

  execute(payload: CreateBookDTO) {
    this.getByAuthorId.execute(payload.authorId);
    return this.bookRepo.save(payload);
  }
}
