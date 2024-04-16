import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  socialName: string;
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

  // posts :       Post[]
  // postLikes:    PostLike[]
  // comments:     Comment[]
  // commentLikes: CommentLike[]
  // followedBy:   User[]
  // following:    User[]
}
