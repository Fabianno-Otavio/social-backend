import { Field, ObjectType } from '@nestjs/graphql';
import { CommentModel } from './comment.model';
import { PostModel } from 'src/post/post.model';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class CommentLikeModel {
  @Field()
  id: string;
  @Field()
  commentId: string;
  @Field()
  postId: string;
  @Field()
  userId: string;

  @Field(() => CommentModel)
  comment: CommentModel;
  @Field(() => PostModel)
  post: PostModel;
  @Field(() => UserModel)
  user: UserModel;
}
