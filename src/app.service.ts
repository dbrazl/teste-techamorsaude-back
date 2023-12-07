import { Injectable } from '@nestjs/common';
import { HealthAppDto, Status } from './health-app.dto';

@Injectable()
export class AppService {
  health(): HealthAppDto {
    return {
      status: Status.ON,
    };
  }
}
