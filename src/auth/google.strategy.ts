// google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '267959229684-cb60rimtu2gkm8p0g472pnnbdgqmjsbg.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    console.log(request);
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
    const user = await this.authService.validateGoogleUser(profile._json.email);
    if (!user) {
      const newUser = await this.authService.createGoogleUser(profile);
      return done(null, newUser);
    }
    return done(null, user);
  }
}
