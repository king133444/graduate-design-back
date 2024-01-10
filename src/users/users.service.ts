import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password';
import { JwtPayload } from 'jsonwebtoken';

import {
  generateTokens,
  validateRefreshToken,
  generateNewAccessToken,
} from '../common/models/jwt';
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
      throw new HttpException('用户名或密码无效', HttpStatus.UNAUTHORIZED);
    }
    // Generate tokens using the jwt module
    const tokens = generateTokens(user.id);

    // Return the tokens
    return { tokens, user };
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

  // 刷新token
  async refreshToken(refreshToken: string) {
    try {
      const payload = validateRefreshToken(refreshToken) as JwtPayload;
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED);
      }

      const newAccessToken = generateNewAccessToken(user.id);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new HttpException('无效的刷新令牌', HttpStatus.UNAUTHORIZED);
    }
  }
}
