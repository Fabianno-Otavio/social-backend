import { CreateCommentDto } from './dtos/createCommentDto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prima.service';
import { UpdateCommentDto } from './dtos/updateCommentDto';
import { CreateCommentLikeDto } from './dtos/createCommentLikeDto';

@Injectable()
export class CommentService {
  constructor(private $prisma: PrismaService) {}

  async getAllComments() {
    return await this.$prisma.comment.findMany();
  }

  async getAllCommentsByUserId(userId: string) {
    return await this.$prisma.comment.findMany({
      where: { userId },
    });
  }

  async getAllCommentsByPostId(postId: string) {
    return await this.$prisma.comment.findMany({
      where: { postId },
    });
  }

  async createComment(data: CreateCommentDto) {
    return await this.$prisma.comment.create({ data });
  }

  async updateComment(data: UpdateCommentDto) {
    return await this.$prisma.comment.update({
      where: { id: data.id },
      data,
    });
  }

  async deleteComment(id: string) {
    return await this.$prisma.comment.delete({
      where: { id },
    });
  }

  async likeComment(id: string) {
    const comment = await this.$prisma.comment.findUnique({
      where: {
        id: id,
      },
    });

    comment.likeCount++;

    await this.$prisma.comment.update({
      where: {
        id: id,
      },
      data: comment,
    });

    const commentLikePayload: CreateCommentLikeDto = {
      commentId: id,
      postId: comment.postId,
      userId: comment.userId,
    };

    return await this.$prisma.commentLike.create({
      data: commentLikePayload,
    });
  }

  async getAllCommentLikesByCommentId(id: string) {
    return await this.$prisma.commentLike.findMany({
      where: { commentId: id },
    });
  }

  async getAllCommentLikesByPostId(id: string) {
    return await this.$prisma.commentLike.findMany({
      where: { postId: id },
    });
  }
}
