import { Field, InputType, OmitType } from '@nestjs/graphql';
import { CreatePostDto } from './createPostDto';

@InputType()
export class CreatePostLikeDto extends OmitType(CreatePostDto, [
  'content',
  'title',
]) {
  @Field()
  postId: string;
}
