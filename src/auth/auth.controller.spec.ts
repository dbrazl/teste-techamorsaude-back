import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
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

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(authenticatedUserDto),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    const loginUserDto: LoginUserDto = {
      cnpj: '12345678912345',
      password: '123456',
    };

    it('should called login', async () => {
      await controller.login(loginUserDto);
      expect(authService.login).toHaveBeenCalledWith(loginUserDto);
    });

    it('should login user successfully', async () => {
      const result = await controller.login(loginUserDto);
      expect(result).toBe(authenticatedUserDto);
    });

    it('should throw a exception', () => {
      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());
      expect(controller.login(loginUserDto)).rejects.toThrow();
    });
  });
});
