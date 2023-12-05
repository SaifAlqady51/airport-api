import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/drizzle/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { eq } from 'drizzle-orm';
import { Response } from 'express';
import { create } from 'domain';

@Injectable()
export class UsersService {
    constructor(
        @Inject(DrizzleProvider)
        private db: PostgresJsDatabase<typeof schema>,
    ) {}

    async logIn(userEamil: string) {
        const ifUserExists = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, userEamil));
        if (ifUserExists.length === 1) {
            return ifUserExists[0];
        } else {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
    }
    async register(createdUser: CreateUserDto) {
        const user = await this.db
            .insert(schema.users)
            .values({ ...createdUser })
            .returning();

        return user;
    }
}
