import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';

export interface IUsersRepository {
  create(user: User): Promise<User>;
}

@Injectable()
export class UsersTypeORMRepository implements IUsersRepository {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }
}
