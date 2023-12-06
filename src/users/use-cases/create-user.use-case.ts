import { CreateUserDto } from '../dto/create-user.dto';
import { Active, User } from '../entities/user.entity';
import { IUsersErrorHandler } from '../users.error-handler';
import { IUsersRepository } from '../users.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  @Inject('IUsersRepository')
  private readonly usersRepository: IUsersRepository;

  @Inject('IUsersErrorHandler')
  private readonly usersErrorHandler: IUsersErrorHandler;

  async execute(input: CreateUserDto): Promise<User> {
    try {
      const {
        company_name,
        fantasy_name,
        cnpj,
        local,
        opening_date,
        password,
      } = input;

      const user = new User({
        company_name,
        fantasy_name,
        cnpj,
        local,
        opening_date: new Date(opening_date),
        active: Active.TRUE,
        password,
      });

      await this.usersRepository.create(user);

      const userResponse = new User({
        company_name,
        fantasy_name,
        cnpj,
        local,
        opening_date: user.opening_date,
        active: user.active,
        password: undefined,
      });

      return userResponse;
    } catch (error) {
      this.usersErrorHandler.handle(error);
    }
  }
}
