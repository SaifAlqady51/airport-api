import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateAirportDto } from './dto/create-airport.dto';
import { AirportService } from './airport.service';

@Controller('api/airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get()
  getSingleData(
    @Query('airportCode') airportCode?: string,
    @Query('cityName') cityName?: string,
  ) {
    if (cityName) {
      return this.airportService.getAllAirportsInCity(cityName);
    }
    if (airportCode) {
      return this.airportService.getAirportByCode(airportCode);
    }
  }

  @Post()
  createAirport(@Body() createAirportDto: CreateAirportDto) {
    return this.airportService.setAirports(createAirportDto);
  }

}
