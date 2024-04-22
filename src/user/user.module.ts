import { Module } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prima.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserResolver, PrismaService, PostService],
  exports: [UserService],
})
export class UserModule {}
