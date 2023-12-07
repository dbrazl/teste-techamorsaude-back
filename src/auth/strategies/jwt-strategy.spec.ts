import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import JwtStrategy from './jwt-strategy';
import { User } from '../../users/entities/user.entity';

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

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  const OLD_ENV = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = {
      JWT_SECRET: 'SECRET',
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [JwtStrategy],
    }).compile();

    strategy = app.get<JwtStrategy>(JwtStrategy);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return the user data', async () => {
      const result = await strategy.validate(user);
      expect(result).toEqual(user);
    });
  });
});
