import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfigAsync } from './core/config/pino.config';
import { envConfig } from './core/config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    LoggerModule.forRootAsync(pinoConfigAsync),
    PrismaModule,
    HealthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
