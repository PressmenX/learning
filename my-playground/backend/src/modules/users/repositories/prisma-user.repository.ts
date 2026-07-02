import { Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from '../interfaces/user.repository.abstract';
import { IUser } from '../interfaces/user.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../DTOs/create-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepositoryAbstract {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<IUser[]> {
    return await this.prisma.user.findMany();
  }

  async save(payload: CreateUserDto): Promise<IUser> {
    return await this.prisma.user.create({
      data: {
        email: payload.email,
        name: payload.name,
      },
    });
  }
}
