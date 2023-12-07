import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthenticateUserUseCase } from './use-cases/authenticate-user.use-case';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';
import { User } from '../users/entities/user.entity';

const opening_date = new Date();

const user: User = new User({
  company_name: 'Company name',
  fantasy_name: 'Fantasy name',
  cnpj: '12345678912345',
  local: 1,
  active: 1,
  opening_date,
  password: undefined,
});

const loginUserDto: AuthenticatedUserDto = {
  user,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
};

describe('AuthService', () => {
  let service: AuthService;
  let authenticateUser: AuthenticateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthenticateUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(loginUserDto),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authenticateUser = module.get<AuthenticateUserUseCase>(
      AuthenticateUserUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
