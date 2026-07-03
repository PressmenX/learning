import { Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from '../interfaces/user.repository.abstract';
import { Prisma } from '../../../generated/prisma/client';
import { UserNotFoundError } from '../errors/user-not-found.error';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryAbstract) {}

  async execute(id: number) {
    try {
      return await this.userRepository.remove(id);
    } catch (err) {
      console.log(err instanceof Prisma.PrismaClientKnownRequestError);
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new UserNotFoundError();
      }

      throw err;
    }
  }
}
