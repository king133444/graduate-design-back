import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password';
import { JwtPayload } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {
  generateTokens,
  validateRefreshToken,
  generateNewAccessToken,
} from '../common/models/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const { name, password, email, roleId } = createUserDto;
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        roleId: roleId,
      },
    });
    return { success: true };
  }

  async login(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    const user = await this.prisma.user.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        password: true,
      },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('用户名或密码无效', HttpStatus.BAD_REQUEST);
    }
    const tokens = generateTokens(user.id);
    delete user.password;
    return { tokens, user };
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const { id, password } = updatePasswordDto;
    console.log('id', id);
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
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
