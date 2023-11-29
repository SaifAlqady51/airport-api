import { Module } from '@nestjs/common';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [AirportController],
  providers: [AirportService, ...drizzleProvider],
})
export class AirportModule {}
