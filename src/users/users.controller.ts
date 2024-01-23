import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './users.service';
import { ApiResponse } from '../common/models/api.response';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @Post('users')
  async getUserList(): Promise<ApiResponse<{ users: User[]; total: number }>> {
    return ApiResponse.success(await this.usersService.getAllUsers());
  }
}
