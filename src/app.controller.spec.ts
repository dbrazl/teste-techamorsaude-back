import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthAppDto, Status } from './health-app.dto';

const healthAppDto: HealthAppDto = {
  status: Status.ON,
};

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            health: jest.fn().mockReturnValue(healthAppDto),
          },
        },
      ],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('health', () => {
    it('should called health', () => {
      controller.health();
      expect(service.health).toHaveBeenCalledWith();
    });

    it('should return status successfuly', () => {
      const result = controller.health();
      expect(result).toEqual(healthAppDto);
    });
  });
});
