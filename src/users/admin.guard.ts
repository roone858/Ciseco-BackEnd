import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authenticatedUserRole = request.user.role;

    // Allow creating an admin user only if the authenticated user is an admin
    return authenticatedUserRole === 'admin';
  }
}
