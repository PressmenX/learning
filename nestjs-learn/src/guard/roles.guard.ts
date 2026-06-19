import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get(Roles, context.getHandler());

    if (!requiredRoles) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const userRole = req.headers['x-roles'];
    const hasRole = requiredRoles.some((role) => userRole?.includes(role));

    if (!hasRole)
      throw new ForbiddenException(
        "You don't have access. can only be accessed by admin.",
      );

    return true;
  }
}
