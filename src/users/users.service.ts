import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    const [users, total] = await Promise.all([
      this.prismaService.user.findMany(),
      this.prismaService.user.count(),
    ]);

    return { users, total };
  }

  async updateUser(user: User) {
    if (!user || !user.id) {
      throw new BadRequestException('用户id被使用');
    }
    // 构建修改数据结构体
    const dataToUpdate: Record<string, any> = {};
    if (user.name !== undefined) {
      dataToUpdate.name = user.name;
    }
    if (user.password !== undefined) {
      dataToUpdate.password = user.password;
    }
    // 检查是否有需要更新的数据
    if (Object.keys(dataToUpdate).length === 0) {
      throw new BadRequestException('没有需要更新的数据');
    }

    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: user.id },
        data: dataToUpdate,
      });

      return updatedUser;
    } catch (error) {
      throw new BadRequestException(`Failed to update user: ${error.message}`);
    }
  }
}
