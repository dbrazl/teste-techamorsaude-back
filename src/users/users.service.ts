import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { User } from './entities/user.entity';
import { FindOneUseCase } from './use-cases/find-one.use-case';
import { FindAllUseCase } from './use-cases/find-all.use-case';

@Injectable()
export class UsersService {
  @Inject(CreateUserUseCase)
  private readonly createUser: CreateUserUseCase;

  @Inject(FindOneUseCase)
  private readonly findUser: FindOneUseCase;

  @Inject(FindAllUseCase)
  private readonly findAllUsers: FindAllUseCase;

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.createUser.execute(createUserDto);
  }

  async findOne(cnpj: string): Promise<User> {
    return this.findUser.execute(cnpj);
  }

  async findAll(): Promise<User[]> {
    return this.findAllUsers.execute();
  }
}
