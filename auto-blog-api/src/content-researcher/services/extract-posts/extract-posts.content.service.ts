import { Injectable } from '@nestjs/common';
//Services
import { WebsiteService } from 'src/website/website.service';
import { WritersService } from 'src/writers/writers.service';
import { ContentResearcherService } from '../content-researcher.service';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class ExtractPosts extends ContentResearcherService {
  constructor(
    prisma: PrismaClientService,
    WritersService: WritersService,
    private readonly WebsiteService: WebsiteService,
  ) {
    super(prisma, WritersService);
  }

  //Checar post/link
  async ckeckPost(linkID: number) {
    return this.prisma.postCollect.findUnique({
      where: { linkExtractID: linkID },
    });
  }

  async extractPosts(websiteID: number) {
    const config = await this.WebsiteService.getWebConfig(websiteID);
    if (config.length) {
      const newPosts: {
        postCollectID: number;
        title: string;
        content: string;
        linkExtractID: number;
      }[] = [];
      if (websiteID) {
        await this.browserInit();
        //Pegar todos os links:
        const linksPosts: { linkID: number; link: string }[] =
          await this.getAllLinks(websiteID);
        //Carregamento:
        for (const linkPost of linksPosts) {
          //Verifica se link ja tem post na db:
          const post = await this.ckeckPost(linkPost.linkID);
          //Extrair post:
          if (linkPost.link && !post) {
            try {
              await this.openPage(linkPost.link, {
                type: config[0].typeAwaitLoad,
                value: config[0].selectorTitle,
              });

              //title:
              const title = await this.page.$eval(
                config[0].selectorTitle,
                (el) => el.innerHTML,
              );
              //content
              const content = await this.page.$$eval(
                config[0].selectorContent,
                (el) => {
                  let content = '';
                  el.forEach((element) => (content += element.innerHTML));
                  return content;
                },
              );
              //Cria o post:
              const response = await this.createPost(
                linkPost.linkID,
                title,
                content,
              );
              newPosts.push(response);
            } catch {
              continue;
            }
          }
        }
        await this.closeBrowser();

        return newPosts;
      }
    }
  }

  async createPost(linkExtractID: number, title: string, content: string) {
    return await this.prisma.postCollect.create({
      data: {
        linkExtractID: linkExtractID,
        title: title,
        content: content,
      },
    });
  }
}
