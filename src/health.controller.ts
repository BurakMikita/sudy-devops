import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ReadinessService } from './readiness.service';

@Controller('app')
export class HealthController {
  constructor(private readonly readinessService: ReadinessService) {}

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }

  @Get('ready')
  getReady() {
    if (!this.readinessService.isReady()) {
      throw new ServiceUnavailableException('not ready');
    }
    return { status: 'ready' };
  }
}
