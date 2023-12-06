import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedUserDto } from '../dto/authenticated-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticateUserUseCase {
  @Inject()
  private readonly usersService: UsersService;

  @Inject()
  private readonly jwtService: JwtService;

  async execute(input: LoginUserDto): Promise<AuthenticatedUserDto> {
    try {
      const { cnpj, password } = input;
      const user = await this.usersService.findOne(cnpj);

      if (!user) {
        throw new Error('User not exist');
      }

      const isPaswordCorrect = await user.checkPassword(password);

      if (!isPaswordCorrect) {
        throw new Error('Password not match');
      }

      const { company_name, fantasy_name, local, opening_date, active } = user;

      const userResponse = new User({
        company_name,
        fantasy_name,
        cnpj,
        local,
        opening_date,
        active,
        password: undefined,
      });

      return {
        user: userResponse,
        token: this.jwtService.sign(userResponse),
      };
    } catch (error) {
      if (error.message === 'User not exist') {
        throw new UnauthorizedException(error.message, {
          cause: error,
          description: 'We could not found the user',
        });
      }

      if (error.message === 'Password not match') {
        throw new UnauthorizedException(error.message, {
          cause: error,
          description: 'Wrong password',
        });
      }

      throw error;
    }
  }
}
