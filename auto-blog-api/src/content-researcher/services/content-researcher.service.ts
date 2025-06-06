import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { WritersService } from 'src/writers/writers.service';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class ContentResearcherService {
  protected browser: Browser;
  protected page: Page;

  constructor(
    protected readonly prisma: PrismaClientService,
    protected readonly WritersService: WritersService,
  ) {}

  //Get's
  async getAllWebSite() {
    return await this.prisma.website.findMany();
  }

  async getWebSite(url: string) {
    return await this.prisma.website.findUnique({
      where: {
        urlwebsite: url,
      },
    });
  }

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
          },
        },
      },
    });
  }
  //Checar link
  async checkLink(url: string) {
    return await this.prisma.linksExtract.findUnique({
      where: { link: url },
    });
  }
  //Checar post/link
  async ckeckPost(linkID: number) {
    return this.prisma.postCollect.findUnique({
      where: { linkExtractID: linkID },
    });
  }

  //Include links em DB
  async createPost(linkExtractID: number, title: string, content: string) {
    return await this.prisma.postCollect.create({
      data: {
        linkExtractID: linkExtractID,
        title: title,
        content: content,
      },
    });
  }

  async createWebSite(url: string) {
    return await this.prisma.website.create({
      data: {
        urlwebsite: url,
      },
    });
  }

  async createLink(websiteID: number, url: string) {
    return await this.prisma.linksExtract.create({
      data: {
        websiteID: websiteID,
        link: url,
      },
    });
  }

  //Configuração das paginas:

  async browserInit(): Promise<void> {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.createSectionsPage();
  }

  async createSectionsPage(): Promise<Page> {
    const page = await this.browser.newPage();
    return page;
  }

  async openPage(
    url: string,
    selector?: { type: string; value: string },
  ): Promise<void> {
    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
      if (selector) {
        switch (selector.type) {
          case 'selector':
            await this.page.waitForSelector(selector.value);
            break;
        }
      } else {
        await this.page.waitForNetworkIdle();
      }
    } catch {
      console.log('Houve error ao carregar pagina!');
    }
  }

  async closePage() {
    return await this.browser.close();
  }
}
