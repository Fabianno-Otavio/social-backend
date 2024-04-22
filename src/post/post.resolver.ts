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
import { CommentService } from 'src/comment/comment.service';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(
    private $post: PostService,
    private $user: UserService,
    private $comment: CommentService,
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

  @Mutation(() => PostModel)
  async likePost(@Args('id') id: string) {
    return await this.$post.likePost(id);
  }

  @ResolveField('commentLikes')
  async commentLikes(@Parent() post: PostModel) {
    return await this.$comment.getAllCommentLikesByPostId(post.id);
  }

  @ResolveField('comments')
  async comments(@Parent() post: PostModel) {
    return await this.$comment.getAllCommentsByPostId(post.id);
  }

  @ResolveField('postLikes')
  async postLikes(@Parent() post: PostModel) {
    return await this.$post.getAllPostLikesByPostId(post.id);
  }

  @ResolveField('user')
  async user(@Parent() post: PostModel) {
    return await this.$user.getUserById(post.userId);
  }
}
