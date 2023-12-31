import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from '../drizzle/schema';
export const DrizzleProvider = 'drizzleProvider';

export const drizzleProvider = [
    {
        provide: DrizzleProvider,
        useFactory: async () => {
            // connect the database
            const pg = postgres(process.env.DATABASE_URL);
            // pass the schema
            const db = drizzle(pg, { schema });
            return db;
        },
        exports: [DrizzleProvider],
    },
];
