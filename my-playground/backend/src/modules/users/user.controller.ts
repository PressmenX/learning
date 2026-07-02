import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';

import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserDto } from './DTOs/create-user.dto';
import { EmailAlreadyExistError } from './errors/email-already-exist.error';

@Controller('users')
export class UserController {
  constructor(
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly createUser: CreateUserUseCase,
  ) {}

  @Get()
  getAll() {
    return this.getAllUsers.execute();
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    try {
      return this.createUser.execute(dto);
    } catch (err) {
      if (err instanceof EmailAlreadyExistError) {
        throw new ConflictException(err.message);
      }
      throw err;
    }
  }
}
