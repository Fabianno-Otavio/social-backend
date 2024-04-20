import { CreatePostDto } from './dtos/createPostDto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prima.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts() {
    return await this.prisma.post.findMany();
  }

  async getPostsFromUser(userId: string) {
    return await this.prisma.post.findMany({
      where: {
        userId,
      },
    });
  }

  async createPost(data: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        ...data,
      },
    });
  }

  async getFeed(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const following = user.following;

    return this.prisma.post.findMany({
      where: {
        userId: {
          in: following,
        },
      },
    });
  }
}
