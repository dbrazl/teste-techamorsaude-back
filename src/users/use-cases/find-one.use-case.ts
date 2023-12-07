import { User } from '../entities/user.entity';
import { IUsersErrorHandler } from '../users.error-handler';
import { IUsersRepository } from '../users.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindOneUseCase {
  @Inject('IUsersRepository')
  private readonly usersRepository: IUsersRepository;

  @Inject('IUsersErrorHandler')
  private readonly usersErrorHandler: IUsersErrorHandler;

  async execute(input: string): Promise<User> {
    try {
      const {
        id,
        company_name,
        fantasy_name,
        active,
        cnpj,
        local,
        opening_date,
      } = await this.usersRepository.findOne(input);

      const userResponse: User = new User({
        company_name,
        fantasy_name,
        cnpj,
        active,
        local,
        opening_date,
        password: undefined,
      });

      userResponse['id'] = id;

      return userResponse;
    } catch (error) {
      this.usersErrorHandler.handle(error);
    }
  }
}
