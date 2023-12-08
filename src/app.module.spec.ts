import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let module: AppModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [],
      providers: [],
    }).compile();

    module = app.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
