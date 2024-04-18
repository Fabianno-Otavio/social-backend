import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/createUserDTO';
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
}
