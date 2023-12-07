import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../users.repository';
import { IUsersErrorHandler } from '../users.error-handler';
import { FindOneUseCase } from './find-one.use-case';

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

describe('FindOneUseCase', () => {
  let useCase: FindOneUseCase;
  let usersRepository: IUsersRepository;
  let usersErrorHandler: IUsersErrorHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneUseCase,
        {
          provide: 'IUsersRepository',
          useValue: {
            findOne: jest.fn().mockResolvedValue(findedUser),
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

    useCase = module.get<FindOneUseCase>(FindOneUseCase);
    usersRepository = module.get<IUsersRepository>('IUsersRepository');
    usersErrorHandler = module.get<IUsersErrorHandler>('IUsersErrorHandler');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    const cnpj: string = '12345678912345';

    it('should called findOne', async () => {
      await useCase.execute(cnpj);
      expect(usersRepository.findOne).toHaveBeenCalledWith(cnpj);
    });

    it('should find one user successfully', async () => {
      const result = await useCase.execute(cnpj);
      expect(result).toEqual(findedUser);
    });

    it('should called handle from handle error', async () => {
      jest.spyOn(usersRepository, 'findOne').mockRejectedValueOnce(new Error());
      await useCase.execute(cnpj);
      expect(usersErrorHandler.handle).toHaveBeenCalledWith(new Error());
    });
  });
});
