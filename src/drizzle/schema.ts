import { pgTable, serial, uuid, varchar } from 'drizzle-orm/pg-core';

export const airports = pgTable('airports', {
    id: uuid('id').primaryKey(),
    airportName: varchar('airportName'),
    airportCode: varchar('airportCode').unique(),
    cityName: varchar('cityName'),
    countryName: varchar('countryName'),
});
