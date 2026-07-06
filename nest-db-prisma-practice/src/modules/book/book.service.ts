import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities';
import BookRepositoryAbstract from './repositories/book.repository.abstract';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepositoryAbstract) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findOne(id: string): Promise<Book | null> {
    return this.bookRepository.findOne(String(id));
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
    return this.bookRepository.update(String(id), updateBookDto);
  }

  async remove(id: string): Promise<Book | null> {
    return this.bookRepository.remove(String(id));
  }
}
