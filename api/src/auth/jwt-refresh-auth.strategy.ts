import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtRefreshConstants } from './constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtRefreshConstants.secret,
      usernameField: 'email',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.userService.findOne(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: +payload.sub, email: payload.email };
  }
}
