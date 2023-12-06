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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
