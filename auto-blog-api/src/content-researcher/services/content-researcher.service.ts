import { Injectable } from '@nestjs/common';
//Services
import { ConfigPage } from './config-page/config-page.service';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class ContentResearcherService extends ConfigPage {
  constructor(protected readonly prisma: PrismaClientService) {
    super();
  }

  //Get's
  async getAllLinks(websiteID: number) {
    return await this.prisma.linksExtract.findMany({
      select: {
        linkID: true,
        link: true,
      },
      where: { websiteID: websiteID },
    });
  }

  async getAllposts(websiteID: number) {
    return await this.prisma.linksExtract.findMany({
      where: {
        websiteID: websiteID,
      },
      include: {
        postCollect: {
          select: {
            title: true,
            content: true,
            dateTime: true,
          },
        },
      },
    });
  }
}
