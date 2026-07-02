import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from '../interfaces/user.repository.abstract';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { Prisma } from '../../../generated/prisma/client';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryAbstract) {}

  async execute(dto: CreateUserDto) {
    try {
      return await this.userRepository.save(dto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email sudah digunakan');
        }
      }
      throw error;
    }
  }
}
