import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { TaskRepositoryAbstract } from './interfaces/tasks.repository.abstract';
import { MockTasksRepository } from './tasks.repository';

@Module({
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    {
      provide: TaskRepositoryAbstract,
      useClass: MockTasksRepository,
    },
  ],
})
export class TasksModule {}
