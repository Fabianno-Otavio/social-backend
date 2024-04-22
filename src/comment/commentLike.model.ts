import { CommentModel } from './comment.model';
import { ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class CommentLikeModel extends OmitType(CommentModel, [
  'content',
  'createdAt',
  'updatedAt',
  'likeCount',
  'commentLikes',
]) {}
