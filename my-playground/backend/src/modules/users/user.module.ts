import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { UserRepositoryAbstract } from './interfaces/user.repository.abstract';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    GetAllUsersUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    {
      provide: UserRepositoryAbstract,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
