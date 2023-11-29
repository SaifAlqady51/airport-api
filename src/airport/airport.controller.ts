import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
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

    @Get('get/airportName')
    getAirportName(@Query('airportCode') airportCode: string) {
        if (airportCode) {
            return this.airportService.getAirportByCode(airportCode);
        } else {
            throw new HttpException(
                'not provided query ',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('get/airportsList')
    getData(@Query('cityName') cityName?: string) {
        if (cityName) {
            return this.airportService.getAllAirportsInCity(cityName);
        } else {
            throw new HttpException(
                'not provided query',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post()
    createAirport(@Body() createAirportDto: CreateAirportDto) {
        return this.airportService.setAirports(createAirportDto);
    }
}
