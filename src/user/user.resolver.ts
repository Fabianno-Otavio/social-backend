import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dtos/createUserDTO';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private $user: UserService) {}

  @Query(() => [UserModel])
  async users() {
    return await this.$user.getUsers();
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: CreateUserDto) {
    return await this.$user.createUser(data);
  }
}
