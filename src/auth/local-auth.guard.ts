// local-auth.guard.ts
import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    // Add your own custom logic here before calling the super.canActivate() method

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    // You can throw an exception based on your custom logic here
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
