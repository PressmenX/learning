import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class TrimmerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();

    if (req.body) {
      req.body = this.triming(req.body);
    }
    return next.handle();
  }

  private triming(data: unknown): unknown {
    if (typeof data === 'string') return data.trim();
    if (Array.isArray(data)) return data.map((item) => this.triming(item));
    if (typeof data === 'object' && data !== null) {
      const trimmed: Record<string, unknown> = {};
      for (const key in data) {
        trimmed[key] = this.triming((data as Record<string, unknown>)[key]);
      }
      return trimmed;
    }
    return data;
  }
}
