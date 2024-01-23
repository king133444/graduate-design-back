// user.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // 替换为实际的路径
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
