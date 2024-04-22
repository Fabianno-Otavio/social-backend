import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentDto {
  @Field()
  postId: string;
  @Field()
  userId: string;

  @Field()
  content: string;
}
