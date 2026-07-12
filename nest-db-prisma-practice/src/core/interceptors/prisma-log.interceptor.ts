import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { finalize, Observable } from 'rxjs';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class PrismaLogInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.prisma.enablePrismaLog();

    return next.handle().pipe(
      finalize(() => {
        this.prisma.disablePrismaLog();
      }),
    );
  }
}
