import { CreateCommentDto } from './createCommentDto';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @Field()
  id: string;
}
