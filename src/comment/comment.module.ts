import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { Module } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prima.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [
    CommentResolver,
    CommentService,
    PostService,
    PrismaService,
    UserService,
  ],
  exports: [CommentService],
})
export class CommentModule {}
