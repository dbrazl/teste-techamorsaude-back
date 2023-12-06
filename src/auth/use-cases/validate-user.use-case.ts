import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CreateUserUseCase {
  @Inject()
  private readonly usersService: UsersService;

  async execute(input: LoginUserDto): Promise<boolean> {
    try {
      const { cnpj, password } = input;
      const user = await this.usersService.findOne(cnpj);

      if (user) {
        const isCorrect = await user.checkPassword(password);

        if (isCorrect) {
          return true;
        }
      }
    } catch (error) {}
    return false;
  }
}
