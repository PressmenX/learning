import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly createTask: CreateTaskUseCase) {}

  @Post()
  create(@Body() payload: CreateTaskDTO) {
    return this.createTask.execute(payload);
  }
}
