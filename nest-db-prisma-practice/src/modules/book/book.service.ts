import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities';
import BookRepositoryAbstract from './repositories/book.repository.abstract';
import { Prisma } from '../../generated/prisma/client';
import { BookAlreadyExistsError } from './errors/book-already-exist.error';
import { BookNotFoundError } from './errors/book-not-found.error';
import { PublisherNotFoundError } from '../publisher/errors/publisher-not-found.error';
import { CategoryNotFoundError } from '../category/errors/category-not-found.error';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepositoryAbstract) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      return await this.bookRepository.save(createBookDto);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new BookAlreadyExistsError();
        }

        if (err.code === 'P2003') {
          throw new PublisherNotFoundError();
        }

        if (err.code === 'P2025') {
          throw new CategoryNotFoundError();
        }

        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne(id);
    if (!book) throw new BookNotFoundError();
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      const { categoryIds } = updateBookDto;

      if (categoryIds) {
        const categories =
          await this.bookRepository.findCategories(categoryIds);
        if (categoryIds.length !== categories.length) {
          throw new CategoryNotFoundError();
        }
      }

      return await this.bookRepository.update(id, updateBookDto);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new BookNotFoundError();
        }

        if (err.code === 'P2002') {
          throw new BookAlreadyExistsError();
        }

        if (err.code === 'P2003') {
          throw new PublisherNotFoundError();
        }

        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }

  async remove(id: string): Promise<Book> {
    try {
      return await this.bookRepository.remove(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new BookNotFoundError();
        }

        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }
}
