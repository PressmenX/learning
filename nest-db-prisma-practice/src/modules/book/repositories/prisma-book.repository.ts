import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Book } from '../entities';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import BookRepositoryAbstract from './book.repository.abstract';
import { Category } from '../../category/entities';
import { GetBookQueryDto } from '../dto/get-book-query.dto';
import { BookWhereInput } from '../../../generated/prisma/models';

@Injectable()
export class PrismaBookRepository implements BookRepositoryAbstract {
  constructor(private readonly prisma: PrismaService) {}

  async findCategories(ids: string[]): Promise<Category[]> {
    return this.prisma.category.findMany({ where: { id: { in: ids } } });
  }

  async findAll(
    query: GetBookQueryDto,
  ): Promise<Book[] | Record<string, unknown>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      author,
      title,
    } = query;
    const skipPage = (page - 1) * limit;

    const where: BookWhereInput = {};

    if (author) {
      where.author = { contains: author, mode: 'insensitive' };
    }

    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    const [data, totalData] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip: skipPage,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.book.count(),
    ]);

    const totalPages = Math.ceil(totalData / limit);

    return {
      meta: {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      result: data,
    };
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
