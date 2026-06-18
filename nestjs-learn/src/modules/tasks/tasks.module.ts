import { Module } from '@nestjs/common';
import { CreateTaskUseCaseService } from './use-case/create-task.use-case';

@Module({
  providers: [CreateTaskUseCaseService]
})
export class TasksModule {}
