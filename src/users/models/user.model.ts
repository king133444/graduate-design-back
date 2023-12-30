import { IsNotEmpty, MinLength } from 'class-validator';
import { BaseModel } from '../../common/models/base.model';
import { UserRole, Proposal, Check, Repair } from '@prisma/client';

export class User extends BaseModel {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  roles?: UserRole[];

  proposals?: Proposal[];

  checks?: Check[];

  repairs?: Repair[];
}
