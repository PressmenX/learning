import { Injectable } from '@nestjs/common';
import { TaskRepositoryAbstract } from '../interfaces/tasks.repository.abstract';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepo: TaskRepositoryAbstract) {}

  execute(payload: CreateTaskDTO) {
    const newId = 'task-' + nanoid();
    const newTask = {
      id: newId,
      ...payload,
    };
    return this.taskRepo.save(newTask);
  }
}
