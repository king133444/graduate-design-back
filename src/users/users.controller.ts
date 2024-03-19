import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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

  @HttpCode(HttpStatus.OK)
  @Post('updateUser')
  async updateUser(@Body() user: User): Promise<ApiResponse<{ user: User }>> {
    const data = await this.usersService.updateUser(user);
    const responseData = {
      user: data,
    };
    return ApiResponse.success(responseData);
  }
}
