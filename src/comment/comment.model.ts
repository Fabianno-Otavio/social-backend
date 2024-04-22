import { CommentLikeModel } from './commentLike.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { PostModel } from './../post/post.model';
import { UserModel } from './../user/user.model';

@ObjectType()
export class CommentModel {
  @Field()
  id: string;
  @Field()
  userId: string;
  @Field()
  postId: string;

  @Field()
  content: string;
  @Field()
  likeCount: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

  @Field(() => [CommentLikeModel])
  commentLikes: CommentLikeModel[];
  @Field(() => PostModel)
  post: PostModel;
  @Field(() => UserModel)
  user: UserModel;
}
