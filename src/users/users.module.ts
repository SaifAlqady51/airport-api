import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { UsersResolver } from './user.resolver';

@Module({
    providers: [UsersService,UsersResolver, ...drizzleProvider],
    exports:[UsersService]
})
export class UsersModule {}
