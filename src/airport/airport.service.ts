import { Get, Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { CreateAirportDto } from './dto/create-airport.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class AirportService {
    constructor(
        @Inject(DrizzleProvider)
        private db: PostgresJsDatabase<typeof schema>,
    ) {}

    async getAirportByCode(airportCode: string) {
        const chosenAirport = await this.db
            .select({
                airportName: schema.airports.airportName,
                cityName: schema.airports.cityName,
                countryName: schema.airports.countryName,
            })
            .from(schema.airports)
            .where(eq(schema.airports.airportCode, airportCode));
        return chosenAirport[0];
    }

    async getAllAirportsInCity(cityName: string) {
        // const allAirportsInCity = await this.db.query.airports.findMany({
        //     where:eq(schema.airports.cityName,cityName)
        // })
        // return allAirportsInCity
        const allAirportsInCity = await this.db
            .select({
                airportName: schema.airports.airportName,
                airportCode: schema.airports.airportCode,
            })
            .from(schema.airports)
            .where(eq(schema.airports.cityName, cityName));

        return allAirportsInCity;
    }

    async setAirports(dto: CreateAirportDto) {
        const insertedAirport = await this.db.insert(schema.airports).values({
            ...dto,
        });
    }
}
