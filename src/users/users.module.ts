import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
    controllers: [UsersController],
    providers: [UsersService, ...drizzleProvider],
})
export class UsersModule {}
