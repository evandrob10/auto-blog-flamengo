import { Injectable } from '@nestjs/common';
//DTO'S
import { LinksPostsDto } from './dto/extract.dto';
//Services
import { WritersService } from 'src/writers/writers.service';
import { ContentResearcherService } from '../content-researcher.service';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class ExtractLinks extends ContentResearcherService {
  constructor(prisma: PrismaClientService, WritersService: WritersService) {
    super(prisma, WritersService);
  }

  //Checar link
  async checkLink(url: string) {
    return await this.prisma.linksExtract.findUnique({
      where: { link: url },
    });
  }

  async extractLinksPosts({
    websiteID,
    websiteUrl,
  }: {
    websiteID: number;
    websiteUrl: string;
  }) {
    await this.browserInit();
    await this.openPage(websiteUrl, {
      type: 'selector',
      value: '.p-url',
    });
    if (websiteUrl) {
      const response: LinksPostsDto[] = await this.page.$$eval(
        '.p-url',
        (elements) => {
          return elements.map((el) => ({
            href: el.getAttribute('href'),
          }));
        },
      );
      for (const link of response) {
        if (link.href) {
          const href = await this.checkLink(link.href);
          if (!href) await this.createLink(websiteID, link.href);
          else continue;
        } else {
          continue;
        }
      }
    }
    await this.closePage();
  }

  async createLink(websiteID: number, url: string) {
    return await this.prisma.linksExtract.create({
      data: {
        websiteID: websiteID,
        link: url,
      },
    });
  }
}
