import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirportModule } from './airport/airport.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { UserResolver } from './users/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"]
        }),
    AirportModule,
    DrizzleModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, UserResolver],
})
export class AppModule { }
