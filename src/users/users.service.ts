import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/drizzle/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
    // get the database
    constructor(
        @Inject(DrizzleProvider)
        private db: PostgresJsDatabase<typeof schema>,
    ) {}

    // login Service
    async logIn(userEamil: string) {
        const ifUserExists = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, userEamil));

        // if that user exists in your database
        if (ifUserExists.length === 1) {
            return ifUserExists[0];

            // user not found error
        } else {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
    }

    // register Service
    async register(createdUser: CreateUserDto) {
        // create the user
        const user = await this.db
            .insert(schema.users)
            .values({ ...createdUser })
            .returning();

        return user;
    }
}
