import { IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @Length(14, 14)
  cnpj: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}
