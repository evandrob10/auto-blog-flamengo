import { Injectable } from '@nestjs/common';
//Prisma
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class WebsiteService {
  public url: string;
  public dataWebSite: { websiteID: number; urlwebsite: string } | null;
  constructor(private readonly prisma: PrismaClientService) {}

  async updateWebSite(url: string) {
    this.dataWebSite = await this.getWebSite(url);
  }

  async getAllWebSite() {
    return await this.prisma.website.findMany();
  }

  async createWebSite(url: string) {
    return await this.prisma.website.create({
      data: {
        urlwebsite: url,
      },
    });
  }

  async getWebSite(url: string) {
    return await this.prisma.website.findUnique({
      where: {
        urlwebsite: url,
      },
    });
  }
}
