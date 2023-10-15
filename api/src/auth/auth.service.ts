import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/interface/user/user.interface';
import { CreateUserDto, LoginUserDto } from 'src/dto/user/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException('ユーザーが存在しません。');
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException(
      'ユーザー名またはパスワードを確認してください。',
    );
  }
}
