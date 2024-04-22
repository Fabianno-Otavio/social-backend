import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';
import { PostLikeModel } from './postLike.model';
import { CommentLikeModel } from 'src/comment/commentLike.model';
import { CommentModel } from 'src/comment/comment.model';

@ObjectType()
export class PostModel {
  @Field()
  id: string;
  @Field()
  userId: string;

  @Field()
  title: string;
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
  @Field(() => [CommentModel])
  comments: CommentModel[];
  @Field(() => [PostLikeModel])
  postLikes: PostLikeModel[];
  @Field(() => UserModel)
  user: UserModel;
}
