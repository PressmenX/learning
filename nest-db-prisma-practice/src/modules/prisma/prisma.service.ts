import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  protected isEnableLog = false;

  constructor(private readonly configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL');

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    const adapter = new PrismaPg({
      connectionString: databaseUrl,
    });

    super({
      adapter,
      log: [{ emit: 'event', level: 'query' }],
    });

    const safePrisma = this as {
      $on: (
        event: 'query',
        callback: (event: { query: string }) => void,
      ) => void;
    };

    safePrisma.$on('query', (e) => {
      if (this.isEnableLog) {
        console.log(e.query);
      }
    });
  }

  enablePrismaLog() {
    this.isEnableLog = true;
  }
  disablePrismaLog() {
    this.isEnableLog = false;
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma has been successfully connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
