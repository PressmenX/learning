import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { CreateBookDTO } from './dto/createBook.dto';
import { ApiKeyGuard } from 'src/guard/api-key/api-key.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Books')
@ApiSecurity('api-key')
@Controller('books')
@UseGuards(ApiKeyGuard)
export class BookController {
  constructor(private readonly createBook: CreateBookUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request or Invalid input data.',
  })
  @ApiResponse({
    status: 403,
    description:
      "API Key not found. Please include 'x-api-key' in the request header.",
  })
  create(@Body() payload: CreateBookDTO) {
    return this.createBook.execute(payload);
  }
}
