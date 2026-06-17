import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './module/products/products.module';
import { ConfigModule } from '@nestjs/config';
import envSchema from './common/config/env.schema';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfigAsync } from './common/config/pino.config';
import { HealthModule } from './module/health/health.module';
import { AuthorModule } from './module/author/author.module';
import { BookModule } from './module/book/book.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envSchema.parse(config),
    }),
    LoggerModule.forRootAsync(pinoConfigAsync),
    HealthModule,
    AuthorModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
