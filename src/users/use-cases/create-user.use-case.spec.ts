import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUsersRepository } from '../users.repository';
import { IUsersErrorHandler } from '../users.error-handler';

const opening_date = new Date();

const createdUser: User = new User({
  company_name: 'Company name',
  fantasy_name: 'Fantasy name',
  cnpj: '12345678912345',
  local: 1,
  active: 1,
  opening_date,
  password: undefined,
});

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let usersRepository: IUsersRepository;
  let usersErrorHandler: IUsersErrorHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'IUsersRepository',
          useValue: {
            create: jest.fn().mockResolvedValue(createdUser),
          },
        },
        {
          provide: 'IUsersErrorHandler',
          useValue: {
            handle: jest.fn().mockResolvedValue(new Error()),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    usersRepository = module.get<IUsersRepository>('IUsersRepository');
    usersErrorHandler = module.get<IUsersErrorHandler>('IUsersErrorHandler');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('create', () => {
    const user: User = new User({
      company_name: 'Company name',
      fantasy_name: 'Fantasy name',
      cnpj: '12345678912345',
      local: 1,
      active: 1,
      opening_date,
      password: '123456',
    });

    const dto: CreateUserDto = {
      company_name: 'Company name',
      fantasy_name: 'Fantasy name',
      cnpj: '12345678912345',
      local: 1,
      opening_date: opening_date.toISOString(),
      password: '123456',
    };

    it('should called create', async () => {
      await useCase.execute(dto);
      expect(usersRepository.create).toHaveBeenCalledWith(user);
    });

    it('should create user successfully', async () => {
      const result = await useCase.execute(dto);
      expect(result).toEqual(createdUser);
    });

    it('should called handle from handle error', async () => {
      jest.spyOn(usersRepository, 'create').mockRejectedValueOnce(new Error());
      await useCase.execute(dto);
      expect(usersErrorHandler.handle).toHaveBeenCalledWith(new Error());
    });
  });
});
