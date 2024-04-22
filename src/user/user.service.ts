import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/createUserDto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prima.service';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<Omit<UserModel, 'password'>> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const user = await this.prisma.user.create({
      data,
    });

    delete user.password;

    return user;
  }

  async getUsers(): Promise<UserModel[]> {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<UserModel> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async followUser(userId: string, userToFollowId: string) {
    const userToFollow = await this.getUserById(userToFollowId);
    const userToFollowFollowedBy = userToFollow.followedBy;

    if (userToFollowFollowedBy.includes(userId)) {
      throw new Error('Você já segue esse usuário.');
    }
    userToFollowFollowedBy.push(userId);

    await this.prisma.user.update({
      where: {
        id: userToFollowId,
      },
      data: {
        followedBy: userToFollowFollowedBy,
      },
    });

    const user = await this.getUserById(userId);
    const userFollowing = user.following;
    userFollowing.push(userToFollowId);

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: userFollowing,
      },
    });
  }

  async unfollowUser(userId: string, userToUnfollowId: string) {
    const userToFollow = await this.getUserById(userToUnfollowId);
    const userToFollowFollowedBy = userToFollow.followedBy;
    if (!userToFollowFollowedBy.includes(userId)) {
      throw new Error('Você já não segue esse usuário.');
    }
    const index = userToFollowFollowedBy.findIndex((f) => f === userId);

    if (index !== -1) {
      userToFollowFollowedBy.splice(index, 1);
    }

    await this.prisma.user.update({
      where: {
        id: userToUnfollowId,
      },
      data: {
        followedBy: userToFollowFollowedBy,
      },
    });

    const user = await this.getUserById(userId);
    const userFollowing = user.following;
    const idx = userFollowing.findIndex((f) => f === userToUnfollowId);

    if (idx !== -1) {
      userFollowing.splice(idx, 1);
    }

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: userFollowing,
      },
    });
  }
}
