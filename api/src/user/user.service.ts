import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { CreateUser, User } from 'src/interface/user/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUser> {
    const { email, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.prisma.user.create({
      data: { email, password: hashedPassword },
      select: { id: true, email: true, createdAt: true },
    });
  }

  async updateHashedRefreshToken(email: string, hashedRefreshToken: string) {
    await this.prisma.user.update({
      where: { email },
      data: { hashedRefreshToken },
    });
  }
}
