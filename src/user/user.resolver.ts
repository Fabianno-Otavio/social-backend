import { CreateUserDto } from './dtos/createUserDto';
import { PostService } from 'src/post/post.service';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private $user: UserService,
    private $post: PostService,
  ) {}

  @Query(() => [UserModel])
  async users() {
    return await this.$user.getUsers();
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: CreateUserDto) {
    return await this.$user.createUser(data);
  }

  @Mutation(() => UserModel)
  async followUser(
    @Args('userId') userId: string,
    @Args('userToFollowId') userToFollowId: string,
  ) {
    return await this.$user.followUser(userId, userToFollowId);
  }

  @Mutation(() => UserModel)
  async unfollowUser(
    @Args('userId') userId: string,
    @Args('userToFollowId') userToFollowId: string,
  ) {
    return await this.$user.unfollowUser(userId, userToFollowId);
  }

  @ResolveField('posts')
  async posts(@Parent() user: UserModel) {
    return await this.$post.getPostsFromUser(user.id);
  }

  @ResolveField('following')
  async following(@Parent() user: UserModel) {
    return user.following;
  }

  @ResolveField('followedBy')
  async followedBy(@Parent() user: UserModel) {
    return user.followedBy;
  }
}
