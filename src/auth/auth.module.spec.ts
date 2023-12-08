import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AppModule } from '../app.module';

describe('AuthModule', () => {
  let module: AuthModule;
  const OLD_ENV = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = {
      JWT_SECRET: 'SECRET',
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
      controllers: [],
      providers: [],
    }).compile();

    module = app.get<AuthModule>(AuthModule);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
