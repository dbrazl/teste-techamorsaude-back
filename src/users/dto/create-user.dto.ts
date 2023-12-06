import { IsNotEmpty, Length } from 'class-validator';
import { Active, Local } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 100)
  company_name: string;

  @IsNotEmpty()
  @Length(3, 100)
  fantasy_name: string;

  @IsNotEmpty()
  @Length(14, 14)
  cnpj: string;

  @IsNotEmpty()
  local: Local;

  @IsNotEmpty()
  opening_date: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}
