import { CreateCommentDto } from './createCommentDto';
import { Field, InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateCommentLikeDto extends OmitType(CreateCommentDto, [
  'content',
]) {
  @Field()
  commentId: string;
}
