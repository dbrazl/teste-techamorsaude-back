import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUseCase } from './use-cases/find-one.use-case';
import { FindAllUseCase } from './use-cases/find-all.use-case';

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

describe('UsersService', () => {
  let service: UsersService;
  let createUser: CreateUserUseCase;
  let findUser: FindOneUseCase;
  let findAllUsers: FindAllUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(createdUser),
          },
        },
        {
          provide: FindOneUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(findedUser),
          },
        },
        {
          provide: FindAllUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(allUsers),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    createUser = module.get<CreateUserUseCase>(CreateUserUseCase);
    findUser = module.get<FindOneUseCase>(FindOneUseCase);
    findAllUsers = module.get<FindAllUseCase>(FindAllUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto: CreateUserDto = {
      company_name: 'Company name',
      fantasy_name: 'Fantasy name',
      cnpj: '12345678912345',
      local: 1,
      opening_date: opening_date.toISOString(),
      password: '123456',
    };

    it('should called execute', async () => {
      await service.create(dto);
      expect(createUser.execute).toHaveBeenCalledWith(dto);
    });

    it('should create user successfully', async () => {
      const result = await service.create(dto);
      expect(result).toEqual(createdUser);
    });

    it('should throw an exception', () => {
      jest.spyOn(createUser, 'execute').mockRejectedValueOnce(new Error());
      expect(service.create(dto)).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    const cnpj: string = '12345678912345';

    it('should called execute', async () => {
      await service.findOne(cnpj);
      expect(findUser.execute).toHaveBeenCalledWith(cnpj);
    });

    it('should find one user successfully', async () => {
      const result = await service.findOne(cnpj);
      expect(result).toEqual(findedUser);
    });

    it('should throw an exception', () => {
      jest.spyOn(findUser, 'execute').mockRejectedValueOnce(new Error());
      expect(service.findOne(cnpj)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should called execute', async () => {
      await service.findAll();
      expect(findAllUsers.execute).toHaveBeenCalled();
    });

    it('should find all user successfully', async () => {
      const result = await service.findAll();
      expect(result).toEqual(allUsers);
    });

    it('should throw an exception', () => {
      jest.spyOn(findAllUsers, 'execute').mockRejectedValueOnce(new Error());
      expect(service.findAll()).rejects.toThrow();
    });
  });
});
