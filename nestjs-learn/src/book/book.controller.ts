import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { type Book } from './interfaces/book.interface';

@Controller('books')
export class BookController {
  constructor(private readonly createBook: CreateBookUseCase) {}
  @Post()
  create(@Body() payload: Book) {
    return this.createBook.execute(payload);
  }
}
