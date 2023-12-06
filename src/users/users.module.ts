import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersTypeORMRepository } from './users.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UsersSQLiteErrorHandler } from './users.error-handler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserUseCase,
    UsersTypeORMRepository,
    {
      provide: 'IUsersRepository',
      useExisting: UsersTypeORMRepository,
    },
    UsersSQLiteErrorHandler,
    {
      provide: 'IUsersErrorHandler',
      useExisting: UsersSQLiteErrorHandler,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
