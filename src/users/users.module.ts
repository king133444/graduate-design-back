import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  providers: [UserController, UserService, PrismaService],
})
export class UsersModule {}
