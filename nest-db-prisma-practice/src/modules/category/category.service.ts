import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { CategoryNotFoundError } from './errors/category-not-found.error';
import { CategoryAlreadyExistsError } from './errors/category-already-exists.error';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.prisma.category.create({ data: dto });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new CategoryAlreadyExistsError();
        }
        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }

  async badFindAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();

    const categoriesWithBooks = await Promise.all(
      categories.map(async (cat) => {
        const books = await this.prisma.book.findMany({
          where: { categories: { some: { id: cat.id } } },
        });

        return { ...cat, books };
      }),
    );

    return categoriesWithBooks;
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany({ include: { books: true } });
  }

  async findOne(id: string): Promise<Category | null> {
    const data = await this.prisma.category.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!data) {
      throw new CategoryNotFoundError();
    }

    return data;
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    try {
      return await this.prisma.category.update({ where: { id }, data: dto });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new CategoryAlreadyExistsError();
        }
        if (err.code === 'P2025') {
          throw new CategoryNotFoundError();
        }
        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }

  async remove(id: string): Promise<Category> {
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new CategoryNotFoundError();
        }
        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }
}
