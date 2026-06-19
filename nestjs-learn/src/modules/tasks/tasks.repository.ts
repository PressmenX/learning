import { Injectable } from '@nestjs/common';
import { TaskRepositoryAbstract } from './interfaces/tasks.repository.abstract';
import { ITasks } from './interfaces/tasks.interface';

@Injectable()
export class MockTasksRepository extends TaskRepositoryAbstract {
  private tasks: ITasks[] = [];

  save(payload: ITasks): ITasks {
    this.tasks.push(payload);
    return payload;
  }

  remove(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }
}
