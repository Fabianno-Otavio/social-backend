import { Field, ObjectType } from '@nestjs/graphql';
import { PostModel } from 'src/post/post.model';

@ObjectType()
export class UserModel {
  @Field()
  id: string;
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

  @Field(() => [PostModel])
  posts?: PostModel[];
  // postLikes:    PostLike[]
  // comments:     Comment[]
  // commentLikes: CommentLike[]
  @Field(() => [String])
  followedBy?: string[];
  @Field(() => [String])
  following?: string[];
}
