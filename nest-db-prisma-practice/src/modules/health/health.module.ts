import { Module } from '@nestjs/common';
import { HealthService } from '@/modules/health/health.service';
import { HealthController } from '@/modules/health/health.controller';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
