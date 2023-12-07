import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user.use-case';
import { AuthenticatedUserDto } from '../dto/authenticated-user.dto';
import { User } from '../../users/entities/user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { IUsersRepository } from '../../users/users.repository';

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

const userResponse: User = new User({
  company_name: 'Company name',
  fantasy_name: 'Fantasy name',
  cnpj: '12345678912345',
  local: 1,
  active: 1,
  opening_date,
  password: undefined,
});

const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const authenticatedUserDto: AuthenticatedUserDto = {
  user: userResponse,
  token,
};

describe('AuthenticateUserUseCase', () => {
  let useCase: AuthenticateUserUseCase;
  let usersRepository: IUsersRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateUserUseCase,
        {
          provide: 'IUsersRepository',
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(token),
          },
        },
      ],
    }).compile();

    useCase = module.get<AuthenticateUserUseCase>(AuthenticateUserUseCase);
    usersRepository = module.get<IUsersRepository>('IUsersRepository');
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    const loginUserDto: LoginUserDto = {
      cnpj: '12345678912345',
      password: '123456',
    };

    it('should called findOne', async () => {
      jest.spyOn(user, 'checkPassword').mockResolvedValue(true);
      await useCase.execute(loginUserDto);
      expect(usersRepository.findOne).toHaveBeenCalledWith(loginUserDto.cnpj);
    });

    it('should called checkPassword', async () => {
      await useCase.execute(loginUserDto);
      expect(user.checkPassword).toHaveBeenCalledWith(loginUserDto.password);
    });

    it('should called sign', async () => {
      jest.spyOn(user, 'checkPassword').mockResolvedValue(true);
      await useCase.execute(loginUserDto);
      expect(jwtService.sign).toHaveBeenCalledWith(userResponse);
    });

    it('should login user successfully', async () => {
      jest.spyOn(user, 'checkPassword').mockResolvedValue(true);
      const result = await useCase.execute(loginUserDto);
      expect(result).toEqual(authenticatedUserDto);
    });

    it('should throw a exception when findOne fails', () => {
      jest.spyOn(usersRepository, 'findOne').mockRejectedValueOnce(new Error());
      expect(useCase.execute(loginUserDto)).rejects.toThrow();
    });

    it('should throw a exception when checkPassword fails', () => {
      jest.spyOn(user, 'checkPassword').mockRejectedValueOnce(new Error());
      expect(useCase.execute(loginUserDto)).rejects.toThrow();
    });

    it('should throw a UnauthorizedException because user not exist', () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null);
      expect(useCase.execute(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw a UnauthorizedException because password not match', () => {
      jest.spyOn(user, 'checkPassword').mockResolvedValueOnce(false);
      expect(useCase.execute(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
