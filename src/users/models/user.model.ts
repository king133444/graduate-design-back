import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseModel } from '../../common/models/base.model';
import { Role, TicketPurchase, Comment } from '@prisma/client';

export class User extends BaseModel {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  roleId: Role;
  tickets: TicketPurchase[];
  comments: Comment[];
}
