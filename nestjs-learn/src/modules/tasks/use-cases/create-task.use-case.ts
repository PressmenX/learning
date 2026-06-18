import { Injectable } from '@nestjs/common';
import { TaskRepositoryAbstract } from '../interfaces/tasks.repository.abstract';
import { CreateTaskDTO } from '../dto/create-task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepo: TaskRepositoryAbstract) {}

  execute(payload: CreateTaskDTO) {
    return this.taskRepo.save(payload);
  }
}
