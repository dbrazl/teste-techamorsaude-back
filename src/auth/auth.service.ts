import { Inject, Injectable } from '@nestjs/common';
import { AuthenticateUserUseCase } from './use-cases/authenticate-user.use-case';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';

@Injectable()
export class AuthService {
  @Inject(AuthenticateUserUseCase)
  private readonly authenticateUser: AuthenticateUserUseCase;

  async login(loginUserDto: LoginUserDto): Promise<AuthenticatedUserDto> {
    return await this.authenticateUser.execute(loginUserDto);
  }
}
