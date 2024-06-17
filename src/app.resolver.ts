import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello() {
    return 'Hello World!';
  }

  @Query(() => Number)
  getNumber() {
    return 123;
  }
}