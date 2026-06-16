import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { CreateBookDTO } from './dto/createBook.dto';

@Controller('books')
export class BookController {
  constructor(private readonly createBook: CreateBookUseCase) {}
  @Post()
  create(@Body() payload: CreateBookDTO) {
    return this.createBook.execute(payload);
  }
}
