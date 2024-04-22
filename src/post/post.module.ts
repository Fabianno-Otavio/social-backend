import { CommentService } from 'src/comment/comment.service';
import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PrismaService } from 'src/prima.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [PostService, PostResolver, CommentService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
