import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersTypeORMRepository } from './users.repository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const today = new Date();

const opening_date = today;

const createdUser = {
  id: '2932880b-044d-4598-8d52-743c1378d471',
  company_name: 'Company name',
  fantasy_name: 'Fantasy name',
  cnpj: '12345678912345',
  local: 1,
  active: 1,
  hash_password: '$2a$12$Yh8ylZ8CcLd0cgCJlizvG.NaCIYQK1ioCHiCTjqalKGgVsdnGHFeu',
  opening_date,
  created_at: today,
  updated_at: today,
};

describe('UsersTypeORMRepository', () => {
  let repository: UsersTypeORMRepository;
  let typeORM: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersTypeORMRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(createdUser),
          },
        },
      ],
    }).compile();

    repository = module.get<UsersTypeORMRepository>(UsersTypeORMRepository);
    typeORM = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
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

    it('should called create', async () => {
      await repository.create(user);
      expect(typeORM.save).toHaveBeenCalledWith(user);
    });

    it('should create user successfully', async () => {
      const result = await repository.create(user);
      expect(result).toEqual(createdUser);
    });

    it('should throw an exception', () => {
      jest.spyOn(typeORM, 'save').mockRejectedValueOnce(new Error());
      expect(repository.create(user)).rejects.toThrow();
    });
  });
});
