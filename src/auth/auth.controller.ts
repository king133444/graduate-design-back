import {
  Controller,
  Post,
  Body,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password';
import { ApiResponse } from '../common/models/api.response';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.auth.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() createUserDto: CreateUserDto) {
    const data = await this.auth.login(createUserDto);
    return ApiResponse.success(data);
  }

  @Post('refreshToken')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const data = await this.auth.refreshToken(refreshToken);
    return ApiResponse.success(data);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('changePassword')
  @HttpCode(HttpStatus.OK)
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    const data = await this.auth.updatePassword(updatePasswordDto);
    return ApiResponse.success(data);
  }
}
