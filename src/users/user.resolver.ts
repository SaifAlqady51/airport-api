import { Resolver, Query } from '@nestjs/graphql';
import { ResolversTypes, User } from '../generated/graphql';

@Resolver('Query')
export class UserResolver {
  @Query('users')
  getUsers(): ResolversTypes['User'][] {
    return [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
      { id: 3, name: 'Saif Doe', email: 'Saif.doe@example.com' },
    ];
  }
}