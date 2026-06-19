import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';
import { DeleteTaskUseCase } from './use-cases/delete-task.use-case';

@Controller('tasks')
@UseGuards(RolesGuard)
export class TasksController {
  constructor(
    private readonly createTask: CreateTaskUseCase,
    private readonly deleteTask: DeleteTaskUseCase,
  ) {}

  @Post()
  create(@Body() payload: CreateTaskDTO) {
    return this.createTask.execute(payload);
  }

  @Delete(':id')
  @Roles(['admin'])
  delete(@Param('id') id: string) {
    return this.deleteTask.execute(id);
  }
}
