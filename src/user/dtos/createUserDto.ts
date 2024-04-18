import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  socialName: string;
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
