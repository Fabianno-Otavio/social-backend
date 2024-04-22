import { CreatePostDto } from './dtos/createPostDto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prima.service';
import { CreatePostLikeDto } from './dtos/createPostLikeDto';
import { UpdatePostDto } from './dtos/updatePostDto';

@Injectable()
export class PostService {
  constructor(private $prisma: PrismaService) {}

  async getAllPosts() {
    return await this.$prisma.post.findMany();
  }

  async getPostsFromUser(userId: string) {
    return await this.$prisma.post.findMany({
      where: {
        userId,
      },
    });
  }

  async createPost(data: CreatePostDto) {
    return await this.$prisma.post.create({
      data: {
        ...data,
      },
    });
  }

  async updatePost(data: UpdatePostDto) {
    return await this.$prisma.post.update({
      where: { id: data.id },
      data: {
        ...data,
      },
    });
  }

  async deletePost(id: string) {
    return await this.$prisma.post.delete({
      where: { id },
    });
  }

  async getFeed(userId: string) {
    const user = await this.$prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const following = user.following;

    return this.$prisma.post.findMany({
      where: {
        userId: {
          in: following,
        },
      },
    });
  }

  async likePost(id: string) {
    const post = await this.$prisma.post.findUnique({
      where: { id },
    });

    post.likeCount++;

    await this.$prisma.post.update({
      where: { id },
      data: post,
    });

    const postLikePayload: CreatePostLikeDto = {
      postId: id,
      userId: post.userId,
    };

    return await this.$prisma.postLike.create({
      data: postLikePayload,
    });
  }

  async getAllPostLikesByPostId(id: string) {
    return await this.$prisma.postLike.findMany({
      where: {
        id,
      },
    });
  }
}
