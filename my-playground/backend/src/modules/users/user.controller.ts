import { Controller, Get } from '@nestjs/common';

import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';

@Controller('users')
export class UserController {
  constructor(private readonly getAllUsers: GetAllUsersUseCase) {}

  @Get()
  findAll() {
    return this.getAllUsers.execute();
  }
}
