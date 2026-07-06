import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import BookRepositoryAbstract from './repositories/book.repository.abstract';
import { PrismaBookRepository } from './repositories/prisma-book.repository';

@Module({
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: BookRepositoryAbstract,
      useClass: PrismaBookRepository,
    },
  ],
})
export class BookModule {}
