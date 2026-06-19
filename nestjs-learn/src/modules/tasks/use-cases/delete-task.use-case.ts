import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepositoryAbstract } from '../interfaces/tasks.repository.abstract';

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly tasksRepo: TaskRepositoryAbstract) {}

  execute(id: string) {
    const exist = this.tasksRepo.remove(id);
    if (!exist) throw new NotFoundException(`Task with id ${id} not found`);
    return exist;
  }
}
