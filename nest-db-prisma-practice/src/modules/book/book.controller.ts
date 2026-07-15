import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities';
import { GetBookQueryDto } from './dto/get-book-query.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(@Query() query: GetBookQueryDto) {
    return await this.bookService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book | null> {
    return await this.bookService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    return await this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Book | null> {
    return await this.bookService.remove(id);
  }
}
