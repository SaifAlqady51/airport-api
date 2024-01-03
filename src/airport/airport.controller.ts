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

    // info endpoint
    @Get()
    helloAirport() {
        return {
            message: 'Welcome to airport api',
            routes: {
                airportName: {
                    route: '~/get/airportName',
                    queries: '?airportCode',
                },
                airportsList: {
                    route: '~/get/airportsList',
                    queries: '?cityName',
                },
            },
        };
    }

    // get airport name from airport code endpoint
    @Get('get/airportName')
    getAirportName(@Query('airportCode') airportCode: string) {
        // if airport Code is passed
        if (airportCode) {
            // return the airport info
            return this.airportService.getAirportByCode(airportCode);
            // Error if the airportCode not passed
        } else {
            throw new HttpException(
                'not provided query, Provided query => ?airportCode={}',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    // get airport List in specific city by passing the city name
    @Get('get/airportsList')
    getData(@Query('cityName') cityName?: string) {
        //if city name is passed
        if (cityName) {
            // return list of airpots in this city
            return this.airportService.getAllAirportsInCity(cityName);
            // if cityName is not passed
        } else {
            throw new HttpException(
                'not provided query, provided query => ?cityName={}',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post()
    createAirport(@Body() createAirportDto: CreateAirportDto) {
        return this.airportService.setAirports(createAirportDto);
    }
}
