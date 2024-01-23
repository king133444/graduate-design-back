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
export class AuthService {
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

    return { data: { user }, success: true };
  }

  async login(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    const user = await this.prisma.user.findUnique({
      where: { name },
    });

    if (!user || user.password !== password) {
      throw new HttpException('用户名或密码无效', HttpStatus.BAD_REQUEST);
    }
    // Generate tokens using the jwt module
    const tokens = generateTokens(user.id);
    delete user.password;

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
      // 解码jwt数据，获取登录时输入的源数据，这里的payload就包含着用户名，密码
      const payload = validateRefreshToken(refreshToken) as JwtPayload;
      console.log('payload.id:', payload.id); // Add this line
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED);
      }

      const newAccessToken = generateNewAccessToken(user.id);
      return { accessToken: newAccessToken };
    } catch (error) {
      console.log(error);
      throw new HttpException('无效的刷新令牌', HttpStatus.UNAUTHORIZED);
    }
  }
}
