import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const airports = pgTable('airports', {
    id: uuid('id').primaryKey(),
    airportName: varchar('airportName'),
    airportCode: varchar('airportCode').unique(),
    cityName: varchar('cityName'),
    countryName: varchar('countryName'),
});

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    name: varchar('name'),
    email: varchar('email').unique().primaryKey(),
    password: varchar('password'),
    subscription: varchar('subscription'),
    token: varchar('token'),
});
