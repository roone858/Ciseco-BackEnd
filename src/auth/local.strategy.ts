// local.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username', // Adjust this based on your user model
      passwordField: 'password',
    });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    // Here, you should implement your own logic to validate the user's credentials
    // For example, check the database for a user with the provided username and password
    const access_token = await this.authService.signIn(username, password);

    if (!access_token) {
      throw new UnauthorizedException();
    }

    return access_token;
  }
}
