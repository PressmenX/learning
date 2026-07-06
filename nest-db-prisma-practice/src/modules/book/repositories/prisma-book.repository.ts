import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Book } from '../entities';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import BookRepositoryAbstract from './book.repository.abstract';

@Injectable()
export class PrismaBookRepository implements BookRepositoryAbstract {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Book[]> {
    return await this.prisma.book.findMany();
  }

  async findOne(id: string): Promise<Book | null> {
    return await this.prisma.book.findUnique({
      where: { id },
    });
  }

  async save(payload: CreateBookDto): Promise<Book> {
    return await this.prisma.book.create({
      data: {
        title: payload.title,
        author: payload.author,
        publishedYear: payload.publishedYear,
      },
    });
  }

  async update(id: string, payload: UpdateBookDto): Promise<Book | null> {
    const data: Partial<Pick<Book, 'title' | 'author' | 'publishedYear'>> = {};

    if (payload.title !== undefined) {
      data.title = payload.title;
    }

    if (payload.author !== undefined) {
      data.author = payload.author;
    }

    if (payload.publishedYear !== undefined) {
      data.publishedYear = payload.publishedYear;
    }

    return await this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Book | null> {
    return await this.prisma.book.delete({
      where: { id },
    });
  }
}
