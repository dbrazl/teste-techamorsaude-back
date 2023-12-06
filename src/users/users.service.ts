import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @Inject(CreateUserUseCase)
  private readonly createUser: CreateUserUseCase;

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.createUser.execute(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(cnpj: string): Promise<User> {
    return new User({
      company_name: 'Company name',
      fantasy_name: 'Fantasy name',
      cnpj,
      local: 1,
      active: 1,
      opening_date: new Date(),
      password: undefined,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
