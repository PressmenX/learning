import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { UserRepositoryAbstract } from './interfaces/user.repository.abstract';
import { PrismaUserRepository } from './repositories/prisma-user.repository';

@Module({
  controllers: [UserController],
  providers: [
    GetAllUsersUseCase,
    {
      provide: UserRepositoryAbstract,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
