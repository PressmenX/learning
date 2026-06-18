import { Module } from '@nestjs/common';
import { MockAuthorRepository } from './author.repository';
import { GetByAuthorIdUseCase } from './use-cases/get-by-author-id.use-case';

@Module({
  exports: [GetByAuthorIdUseCase],
  providers: [
    GetByAuthorIdUseCase,
    {
      provide: 'AUTHOR_REPO_TOKEN',
      useClass: MockAuthorRepository,
    },
  ],
})
export class AuthorModule {}
