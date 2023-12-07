import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthAppDto } from './health-app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  health(): HealthAppDto {
    return this.appService.health();
  }
}
