import { Injectable } from '@nestjs/common';
import { TaskRepositoryAbstract } from './interfaces/tasks.repository.abstract';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class MockTasksRepository extends TaskRepositoryAbstract {
  private tasks: CreateTaskDTO[] = [];

  save(payload: CreateTaskDTO): CreateTaskDTO {
    this.tasks.push(payload);
    return payload;
  }
}
