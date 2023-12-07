import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticateUserUseCase } from './use-cases/authenticate-user.use-case';
import { UsersTypeORMRepository } from '../users/users.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import JwtStrategy from './strategies/jwt-strategy';
import { AuthSQLiteErrorHandler } from './auth.error-handler';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    JwtStrategy,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthenticateUserUseCase,
    UsersTypeORMRepository,
    {
      provide: 'IUsersRepository',
      useExisting: UsersTypeORMRepository,
    },
    AuthSQLiteErrorHandler,
    {
      provide: 'IAuthErrorHandler',
      useExisting: AuthSQLiteErrorHandler,
    },
  ],
})
export class AuthModule {}
