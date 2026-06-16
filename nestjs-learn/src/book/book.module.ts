import { Module } from '@nestjs/common';
import { MockBookRepository } from './book.repository';
import { AuthorModule } from 'src/author/author.module';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { BookController } from './book.controller';

@Module({
  imports: [AuthorModule],
  providers: [
    {
      provide: 'BOOK_REPO_TOKEN',
      useClass: MockBookRepository,
    },
    CreateBookUseCase,
  ],
  controllers: [BookController],
})
export class BookModule {}
