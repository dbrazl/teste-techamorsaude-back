import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthenticateUserUseCase } from './use-cases/authenticate-user.use-case';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

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

const authenticatedUserDto: AuthenticatedUserDto = {
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
            execute: jest.fn().mockResolvedValue(authenticatedUserDto),
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

  describe('login', () => {
    const loginUserDto: LoginUserDto = {
      cnpj: '12345678912345',
      password: '123456',
    };

    it('should called login', async () => {
      await service.login(loginUserDto);
      expect(authenticateUser.execute).toHaveBeenCalledWith(loginUserDto);
    });

    it('should login user successfully', async () => {
      const result = await service.login(loginUserDto);
      expect(result).toBe(authenticatedUserDto);
    });

    it('should throw a exception', () => {
      jest
        .spyOn(authenticateUser, 'execute')
        .mockRejectedValueOnce(new Error());
      expect(service.login(loginUserDto)).rejects.toThrow();
    });
  });
});
