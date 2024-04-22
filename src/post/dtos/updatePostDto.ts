import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreatePostDto } from './createPostDto';

@InputType()
export class UpdatePostDto extends PartialType(CreatePostDto) {
  @Field()
  id: string;
}
