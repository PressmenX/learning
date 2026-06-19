import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { setupSwagger } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.useLogger(app.get(Logger));
  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableShutdownHooks();
  await app.listen(port ?? 3000);
}
bootstrap();
