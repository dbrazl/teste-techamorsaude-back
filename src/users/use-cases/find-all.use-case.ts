import { User } from '../entities/user.entity';
import { IUsersErrorHandler } from '../users.error-handler';
import { IUsersRepository } from '../users.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUseCase {
  @Inject('IUsersRepository')
  private readonly usersRepository: IUsersRepository;

  @Inject('IUsersErrorHandler')
  private readonly usersErrorHandler: IUsersErrorHandler;

  async execute(): Promise<User[]> {
    try {
      const users = await this.usersRepository.findAll();

      const usersResponse = users.map(
        ({
          id,
          company_name,
          fantasy_name,
          active,
          cnpj,
          local,
          opening_date,
        }: User) => {
          const user = new User({
            company_name,
            fantasy_name,
            active,
            cnpj,
            local,
            opening_date,
            password: undefined,
          });

          user['id'] = id;

          return user;
        },
      );

      return usersResponse;
    } catch (error) {
      this.usersErrorHandler.handle(error);
    }
  }
}
