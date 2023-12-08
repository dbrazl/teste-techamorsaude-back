import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../users.repository';
import { IUsersErrorHandler } from '../users.error-handler';
import { FindAllUseCase } from './find-all.use-case';

const opening_date = new Date();

const findedUser: User = new User({
  company_name: 'Company name',
  fantasy_name: 'Fantasy name',
  cnpj: '12345678912345',
  local: 1,
  active: 1,
  opening_date,
  password: undefined,
});

findedUser['id'] = '2932880b-044d-4598-8d52-743c1378d471';

const allUsers: User[] = new Array(10).fill(findedUser);

describe('FindAllUseCase', () => {
  let useCase: FindAllUseCase;
  let usersRepository: IUsersRepository;
  let usersErrorHandler: IUsersErrorHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUseCase,
        {
          provide: 'IUsersRepository',
          useValue: {
            findAll: jest.fn().mockResolvedValue(allUsers),
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

    useCase = module.get<FindAllUseCase>(FindAllUseCase);
    usersRepository = module.get<IUsersRepository>('IUsersRepository');
    usersErrorHandler = module.get<IUsersErrorHandler>('IUsersErrorHandler');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should called findOne', async () => {
      await useCase.execute();
      expect(usersRepository.findAll).toHaveBeenCalled();
    });

    it('should find all users successfully', async () => {
      const result = await useCase.execute();
      expect(result).toEqual(allUsers);
      expect(result).toHaveLength(10);
    });

    it('should called handle from handle error', async () => {
      jest.spyOn(usersRepository, 'findAll').mockRejectedValueOnce(new Error());
      await useCase.execute();
      expect(usersErrorHandler.handle).toHaveBeenCalledWith(new Error());
    });
  });
});
