import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const route = `${req.method} ${req.url}`;
    const message = exception.message;
    const timestamp = new Date().toISOString();

    const exceptionRes = exception.getResponse();
    const errors =
      typeof exceptionRes === 'object'
        ? (exceptionRes as Record<string, unknown>).message
        : exceptionRes;

    res.status(statusCode).json({
      statusCode,
      route,
      message,
      errors,
      timestamp,
    });
  }
}
