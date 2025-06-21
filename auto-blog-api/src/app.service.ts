import { Injectable } from '@nestjs/common';
import { PrismaClientService } from './prisma-client/prisma-client.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaClientService) {}
  async getAllPosts(userID: number) {
    return await this.prisma.postFinally.findMany({
      where: {
        authorID: userID,
      },
      orderBy: { postFinallyID: 'desc' },
    });
  }
  async deleteAllPosts() {
    return await this.prisma.postFinally.deleteMany();
  }
}
