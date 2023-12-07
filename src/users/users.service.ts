import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { User } from './entities/user.entity';
import { FindOneUseCase } from './use-cases/find-one.use-case';

@Injectable()
export class UsersService {
  @Inject(CreateUserUseCase)
  private readonly createUser: CreateUserUseCase;

  @Inject(FindOneUseCase)
  private readonly findUser: FindOneUseCase;

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.createUser.execute(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(cnpj: string): Promise<User> {
    return this.findUser.execute(cnpj);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
