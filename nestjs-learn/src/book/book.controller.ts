import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { CreateBookDTO } from './dto/createBook.dto';
import { ApiKeyGuard } from 'src/guard/api-key/api-key.guard';

@Controller('books')
@UseGuards(ApiKeyGuard)
export class BookController {
  constructor(private readonly createBook: CreateBookUseCase) {}
  @Post()
  create(@Body() payload: CreateBookDTO) {
    return this.createBook.execute(payload);
  }
}
