import { Injectable } from '@nestjs/common';
//Prisma
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { CreateConfigDto } from './dto/createWebConfig.dto';
import { updateWebConfig } from './dto/updateWebConfig';

@Injectable()
export class WebsiteService {
  public url: string;
  public dataWebSite: { websiteID: number; urlwebsite: string } | null;
  constructor(private readonly prisma: PrismaClientService) {}

  async getWebConfig(websiteID: number) {
    return await this.prisma.webConfig.findMany({
      where: { websiteID: websiteID },
    });
  }

  async getAllWebSite(userID: number) {
    return await this.prisma.website.findMany({
      where: {
        userID: userID,
      },
    });
  }

  async createWebSite(userID: number, url: string) {
    return await this.prisma.website.create({
      data: {
        userID: userID,
        urlwebsite: url,
      },
    });
  }

  async createWebConfig(webConfig: CreateConfigDto) {
    return await this.prisma.webConfig.create({
      data: webConfig,
    });
  }

  async deleteWebSite(websiteID: number) {
    return await this.prisma.website.delete({
      where: {
        websiteID: websiteID,
      },
    });
  }

  async updateWebConfig(websiteID: number, webConfig: updateWebConfig) {
    return await this.prisma.webConfig.update({
      where: {
        websiteID: websiteID,
      },
      data: webConfig,
    });
  }

  async getWebSite(userID: number, url: string) {
    return await this.prisma.website.findFirst({
      where: {
        userID: userID,
        urlwebsite: url,
      },
    });
  }
}
