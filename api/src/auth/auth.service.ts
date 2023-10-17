import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUser, ValidatedUser } from 'src/interface/user/user.interface';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Tokens } from 'src/interface/token/token.interface';
import { jwtConstants, jwtRefreshConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<CreateUser> {
    const duplicatedUser = await this.userService.findOne(createUserDto.email);
    if (duplicatedUser !== null) {
      throw new InternalServerErrorException(
        'キー重複により、ユーザーの作成に失敗しました。',
      );
    }
    return await this.userService.create(createUserDto);
  }

  async login(user: ValidatedUser): Promise<Tokens> {
    const tokens = await this.getTokens(user.email, '' + user.id);
    await this.updateHashedRefreshToken(user.email, tokens.refresh_token);
    return {
      ...tokens,
    };
  }

  async logout(user: ValidatedUser): Promise<void> {
    await this.userService.updateHashedRefreshToken(user.email, null);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidatedUser | null> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getTokens(email: string, sub: string): Promise<Tokens> {
    const payload = { email, sub };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtRefreshConstants.secret,
      expiresIn: '7d',
    });
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async updateHashedRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.userService.updateHashedRefreshToken(email, hashedRefreshToken);
  }

  async refreshToken(
    user: ValidatedUser,
    authorization: string,
  ): Promise<Tokens> {
    const existedUser = await this.userService.findOne(user.email);
    if (!existedUser) {
      throw new UnauthorizedException();
    }
    const refreshToken = authorization.replace('Bearer', '').trim();
    if (!(await bcrypt.compare(refreshToken, existedUser.hashedRefreshToken))) {
      throw new UnauthorizedException();
    }
    const tokens = await this.getTokens(existedUser.email, '' + existedUser.id);
    await this.updateHashedRefreshToken(
      existedUser.email,
      tokens.refresh_token,
    );
    return { ...tokens };
  }
}
