import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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
}
