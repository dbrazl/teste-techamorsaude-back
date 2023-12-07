import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedUserDto } from '../dto/authenticated-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { IUsersRepository } from '../../users/users.repository';
import { IAuthErrorHandler } from '../auth.error-handler';

@Injectable()
export class AuthenticateUserUseCase {
  @Inject('IUsersRepository')
  private readonly usersRepository: IUsersRepository;

  @Inject()
  private readonly jwtService: JwtService;

  @Inject('IAuthErrorHandler')
  private readonly errorHandler: IAuthErrorHandler;

  async execute(input: LoginUserDto): Promise<AuthenticatedUserDto> {
    try {
      const { cnpj, password } = input;
      const user = await this.usersRepository.findOne(cnpj);

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

      const plainObject = {
        company_name,
        fantasy_name,
        cnpj,
        local,
        opening_date,
        active,
        password: undefined,
      };

      return {
        user: userResponse,
        token: this.jwtService.sign(plainObject),
      };
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
}
