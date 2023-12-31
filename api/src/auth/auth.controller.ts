import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { CreateUser } from 'src/interface/user/user.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guard/auth/local-auth.guard';
import { JwtPublic } from '../decorator/auth/jwt-auth.decorator';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { Tokens } from 'src/interface/token/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @JwtPublic()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<CreateUser> {
    return this.authService.signUp(createUserDto);
  }

  @JwtPublic()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req): Promise<Tokens> {
    return this.authService.login(req.user);
  }

  @JwtPublic()
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  async logout(@Request() req): Promise<void> {
    return this.authService.logout(req.user);
  }

  @JwtPublic()
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Request() req): Promise<Tokens> {
    return this.authService.refreshToken(req.user, req.headers.authorization);
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
