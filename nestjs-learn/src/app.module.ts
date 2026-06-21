import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import envSchema from './common/config/env.schema';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfigAsync } from './common/config/pino.config';
import { HealthModule } from './modules/health/health.module';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ContactsModule } from './modules/contacts/contacts.module';

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
    TasksModule,
    InventoryModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
