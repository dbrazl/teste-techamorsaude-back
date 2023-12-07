import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthAppDto, Status } from './health-app.dto';

const healthAppDto: HealthAppDto = {
  status: Status.ON,
};

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('health', () => {
    it('should return status successfuly', () => {
      const result = service.health();
      expect(result).toEqual(healthAppDto);
    });
  });
});
