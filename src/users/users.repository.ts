import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface IUsersRepository {
  create(user: User): Promise<User>;
  findOne(cnpj: string): Promise<User>;
}

@Injectable()
export class UsersTypeORMRepository implements IUsersRepository {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findOne(cnpj: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ cnpj });
    } catch (error) {
      throw new NotFoundException(error.message, {
        cause: error,
        description: 'User is not founded',
      });
    }
  }
}
