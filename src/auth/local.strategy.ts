// local.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'identifier', // Adjust this based on your user model // Adjust this based on your user model
      passwordField: 'password',
    });
  }

  async validate(
    identifier: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const access_token = await this.authService.signIn(identifier, password);

    if (!access_token) {
      throw new UnauthorizedException();
    }

    return access_token;
  }
}
