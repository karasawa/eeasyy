import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local-auth.strategy';
import { JwtStrategy } from './jwt-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './jwt-refresh-auth.strategy';
import { PrismaService } from 'prisma.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    PrismaService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
