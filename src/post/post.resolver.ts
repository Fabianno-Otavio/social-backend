import { CreatePostDto } from './dtos/createPostDto';
import { PostModel } from './post.model';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(
    private $post: PostService,
    private $user: UserService,
  ) {}

  @Query(() => [PostModel])
  async getAllPosts() {
    return await this.$post.getAllPosts();
  }

  @Query(() => [PostModel])
  async getPostsFromUser(@Args('id') userId: string) {
    return await this.$post.getPostsFromUser(userId);
  }

  @Mutation(() => PostModel)
  async createPost(@Args('data') data: CreatePostDto) {
    return await this.$post.createPost(data);
  }

  @Mutation(() => [PostModel])
  async getFeed(@Args('userId') userId: string) {
    return await this.$post.getFeed(userId);
  }

  @ResolveField('user')
  async user(@Parent() post: PostModel) {
    return this.$user.getUserById(post.userId);
  }
}
