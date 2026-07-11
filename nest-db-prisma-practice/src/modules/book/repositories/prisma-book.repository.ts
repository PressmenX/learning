import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Book } from '../entities';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import BookRepositoryAbstract from './book.repository.abstract';
import { Category } from '../../category/entities';

@Injectable()
export class PrismaBookRepository implements BookRepositoryAbstract {
  constructor(private readonly prisma: PrismaService) {}

  async findCategories(ids: string[]): Promise<Category[]> {
    return this.prisma.category.findMany({ where: { id: { in: ids } } });
  }

  async findAll(): Promise<Book[]> {
    return await this.prisma.book.findMany();
  }

  async findOne(id: string): Promise<Book | null> {
    return await this.prisma.book.findUnique({
      where: { id },
      include: { categories: true },
    });
  }

  async save(payload: CreateBookDto): Promise<Book> {
    const { categoryIds, ...data } = payload;
    return await this.prisma.book.create({
      data: {
        ...data,
        categories: {
          connect: categoryIds?.map((id) => ({ id })) ?? [],
        },
      },
    });
  }

  async update(id: string, payload: UpdateBookDto): Promise<Book> {
    const { categoryIds, ...data } = payload;
    return await this.prisma.book.update({
      where: { id },
      data: {
        ...data,
        categories: categoryIds
          ? {
              connect: categoryIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  async remove(id: string): Promise<Book> {
    return await this.prisma.book.delete({
      where: { id },
    });
  }
}
