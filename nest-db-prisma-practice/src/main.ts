import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { HttpErrorFilter } from './core/filters/http-error.filter';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { TrimmerInterceptor } from './core/interceptors/trimmer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = new ConfigService();

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new TrimmerInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();

  await app.listen(configService.get('PORT') ?? 3000);
}
void bootstrap();
