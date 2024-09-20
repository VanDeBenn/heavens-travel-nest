import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '846062676763-v31cpl21i6kd0krj3d8vki6jf225evho.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3222/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      profile,
      accessToken,
    };
    done(null, user, profile);
  }
}
