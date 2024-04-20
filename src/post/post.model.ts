import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class PostModel {
  @Field()
  id: string;
  @Field(() => UserModel)
  user: UserModel;
  @Field()
  userId: string;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field()
  likeCount: number;
  // @Field()
  // comments     : Comment[]
  // @Field()
  // commentLikes : CommentLike[]
  // @Field()
  // postLikes    : PostLike[]
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
