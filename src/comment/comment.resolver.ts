import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentModel } from './comment.model';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dtos/updateCommentDto';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(
    private $comment: CommentService,
    private $user: UserService,
    private $post: PostService,
  ) {}

  @Query(() => [CommentModel])
  async getAllComments() {
    return await this.$comment.getAllComments();
  }

  @Query(() => [CommentModel])
  async getAllCommentsByUserId(@Args('userId') userId: string) {
    return await this.$comment.getAllCommentsByUserId(userId);
  }

  @Query(() => [CommentModel])
  async getAllCommentsByPostId(@Args('postId') postId: string) {
    return await this.$comment.getAllCommentsByUserId(postId);
  }

  @Mutation(() => CommentModel)
  async updateComment(@Args('data') data: UpdateCommentDto) {
    return await this.$comment.updateComment(data);
  }

  @Mutation(() => CommentModel)
  async deleteComment(@Args('id') id: string) {
    return await this.$comment.deleteComment(id);
  }

  @Mutation(() => CommentModel)
  async likeComment(@Args('id') id: string) {
    return await this.$comment.likeComment(id);
  }

  @ResolveField('commentLikes')
  async commentLikes(@Parent() comment: CommentModel) {
    this.$comment.getAllCommentLikesByCommentId(comment.id);
  }

  @ResolveField('post')
  async post(@Parent() comment: CommentModel) {
    return await this.$post.getPostsFromUser(comment.userId);
  }

  @ResolveField('user')
  async user(@Parent() comment: CommentModel) {
    return await this.$user.getUserById(comment.userId);
  }
}
