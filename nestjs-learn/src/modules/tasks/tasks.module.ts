import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { TaskRepositoryAbstract } from './interfaces/tasks.repository.abstract';
import { MockTasksRepository } from './tasks.repository';
import { DeleteTaskUseCase } from './use-cases/delete-task.use-case';

@Module({
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    {
      provide: TaskRepositoryAbstract,
      useClass: MockTasksRepository,
    },
  ],
})
export class TasksModule {}
