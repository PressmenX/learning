import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserDto } from './DTOs/create-user.dto';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get()
  async getAll() {
    return this.getAllUsers.execute();
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.createUser.execute(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const res = await this.deleteUser.execute(id);

    return {
      message: `User with id ${res.id} has been successfully deleted.`,
      data: '',
    };
  }
}
