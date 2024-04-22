import { ObjectType, OmitType } from '@nestjs/graphql';
import { PostModel } from './post.model';

@ObjectType()
export class PostLikeModel extends OmitType(PostModel, [
  'content',
  'createdAt',
  'updatedAt',
  'likeCount',
  'title',
]) {}
