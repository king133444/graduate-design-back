import { Controller, Post, Body, UseGuards, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password';
import { ApiResponse } from '../common/models/api.response';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.login(createUserDto);
    return ApiResponse.success({
      user,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('changePassword')
  async updatePassword(
    @Query('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }
}
