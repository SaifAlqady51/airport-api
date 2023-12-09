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

    async checkEmailExists(userEmail: string) {
        const userExists = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, userEmail));

        return userExists[0]
    }

    // login Service
    async logIn(userEamil: string) {

        const ifUserExists = await this.checkEmailExists(userEamil)



        // if that user exists in your database
        if (ifUserExists) {
            return ifUserExists;

            // user not found error
        } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    // register Service
    async register(createdUser: CreateUserDto) {

        const ifEmailExsits = await this.checkEmailExists(createdUser.email)

        if(ifEmailExsits){
            throw new HttpException('Email has been already used', HttpStatus.CONFLICT)
        }
        // create the user
        const user = await this.db
            .insert(schema.users)
            .values({ ...createdUser })
            .returning();

        return user;
    }
}
