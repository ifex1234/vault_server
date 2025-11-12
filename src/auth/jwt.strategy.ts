import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (typeof secret !== 'string') {
      throw new Error('JWT_SECRET is not defined or not a string');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // This payload comes from the JWT itself (e.g., { email: '...', sub: '...' })
    // We can fetch the user from the database to ensure they still exist and are valid.
    const user = await this.authService.validateUser(payload.email);
    return user; // This user object will be attached to req.user
  }
}
