import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    const user = await this.prisma.user.create({
      data: {
        name,
        password,
        // other fields
      },
    });

    return user;
  }

  async login(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    const user = await this.prisma.user.findUnique({
      where: { name },
    });

    if (!user || user.password !== password) {
      throw new Error('用户名或密码无效');
    }

    return user;
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const { password } = updatePasswordDto;

    const user = await this.prisma.user.update({
      where: { id: id },
      data: {
        password,
      },
    });

    return user;
  }
}
