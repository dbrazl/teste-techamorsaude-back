import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { UsersModule } from './users.module';

describe('UsersModule', () => {
  let module: UsersModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
      controllers: [],
      providers: [],
    }).compile();

    module = app.get<UsersModule>(UsersModule);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
