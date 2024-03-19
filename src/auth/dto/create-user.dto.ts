import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  // @IsEmail()
  email: string;
  // @IsNotEmpty()
  roleId: number;
}
