import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async checkConnection() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        message: 'Database connected successfully',
        data: '',
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(
          `Database connection failed due to internal server error: ${err.message}`,
        );
      }
      throw err;
    }
  }
}
