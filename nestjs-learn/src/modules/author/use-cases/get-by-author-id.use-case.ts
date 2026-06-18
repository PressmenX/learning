import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type IAuthorRepository } from '../author.repository';

@Injectable()
export class GetByAuthorIdUseCase {
  constructor(
    @Inject('AUTHOR_REPO_TOKEN')
    private readonly authRepo: IAuthorRepository,
  ) {}

  execute(id: string) {
    const author = this.authRepo.findOne(id);
    if (author === null)
      throw new NotFoundException(`Author with id ${id} not found`);

    return author;
  }
}
