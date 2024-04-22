import { PostModel } from 'src/post/post.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class PostLikeModel {
  @Field()
  id: string;
  @Field()
  postId: string;
  @Field()
  userId: string;

  @Field(() => PostModel)
  post: PostModel;
  @Field(() => UserModel)
  user: UserModel;
}
