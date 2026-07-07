import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Publisher } from './entities';
import { Prisma } from '../../generated/prisma/client';
import { PublisherAlreadyExistsError } from './errors/publisher-already-exists.error';
import { PublisherNotFoundError } from './errors/publisher-not-found.error';
import { PublisherHasBooksError } from './errors/publisher-has-books.error';

@Injectable()
export class PublisherService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreatePublisherDto): Promise<Publisher> {
    try {
      return await this.prisma.publisher.create({ data: dto });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new PublisherAlreadyExistsError();
        }
        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }

  async findAll(): Promise<Publisher[]> {
    return await this.prisma.publisher.findMany();
  }

  async findOne(id: string): Promise<Publisher> {
    const publisher = await this.prisma.publisher.findUnique({
      where: { id },
      include: { books: true },
    });
    if (!publisher) throw new PublisherNotFoundError();
    return publisher;
  }

  async update(id: string, dto: UpdatePublisherDto): Promise<Publisher> {
    try {
      return await this.prisma.publisher.update({
        where: { id },
        data: dto,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new PublisherNotFoundError();
        }
        if (err.code === 'P2002') {
          throw new PublisherAlreadyExistsError();
        }
        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }

  async remove(id: string): Promise<Publisher> {
    try {
      return await this.prisma.publisher.delete({ where: { id } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new PublisherNotFoundError();
        }
        if (err.code === 'P2003') {
          throw new PublisherHasBooksError();
        }
        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }
}
