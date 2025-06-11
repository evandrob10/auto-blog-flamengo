import { Injectable } from '@nestjs/common';
//DTO'S
import { LinksPostsDto } from './dto/extract.dto';
//Services
import { WebsiteService } from 'src/website/website.service';
import { WritersService } from 'src/writers/writers.service';
import { ContentResearcherService } from '../content-researcher.service';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class ExtractLinks extends ContentResearcherService {
  constructor(
    prisma: PrismaClientService,
    WritersService: WritersService,
    private readonly WebsiteService: WebsiteService,
  ) {
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
    urlwebsite,
  }: {
    websiteID: number;
    urlwebsite: string;
  }) {
    const config = await this.WebsiteService.getWebConfig(websiteID);
    await this.browserInit();
    await this.openPage(urlwebsite, {
      type: config[0].typeAwaitLoad,
      value: config[0].selectAwaitLoad ? config[0].typeAwaitLoad : '',
    });
    try {
      if (urlwebsite) {
        const response: LinksPostsDto[] = await this.page.$$eval(
          `${config[0].selectorPosts}`,
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
      return {
        getlink: true,
      };
    } catch {
      return {
        getlink: false,
      };
    } finally {
      await this.closePage();
    }
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
