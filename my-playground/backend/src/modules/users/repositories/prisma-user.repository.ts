import { Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from '../interfaces/user.repository.abstract';
import { IUser } from '../interfaces/user.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepositoryAbstract {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<IUser[]> {
    return await this.prisma.user.findMany();
  }
}
