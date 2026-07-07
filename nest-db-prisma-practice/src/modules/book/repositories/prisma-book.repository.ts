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
      data: payload,
    });
  }

  async update(id: string, payload: UpdateBookDto): Promise<Book> {
    return await this.prisma.book.update({
      where: { id },
      data: payload,
    });
  }

  async remove(id: string): Promise<Book> {
    return await this.prisma.book.delete({
      where: { id },
    });
  }
}
