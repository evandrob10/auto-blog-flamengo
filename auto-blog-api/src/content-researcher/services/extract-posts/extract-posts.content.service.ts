import { Injectable } from '@nestjs/common';
//Services
import { WebsiteService } from 'src/website/website.service';
import { ContentResearcherService } from '../content-researcher.service';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';
import { PostsDto } from './dto/posts.dto';

@Injectable()
export class ExtractPosts extends ContentResearcherService {
  constructor(
    prisma: PrismaClientService,
    private readonly WebsiteService: WebsiteService,
  ) {
    super(prisma);
  }

  //Checar post/link
  async ckeckPost(linkID: number) {
    return this.prisma.postCollect.findUnique({
      where: { linkExtractID: linkID },
    });
  }

  //Função responsavel extrair os posts:
  async extractPosts(websiteID: number) {
    const config = await this.WebsiteService.getWebConfig(websiteID); // Pegar configuração de extração salva da url.
    if (config.length) {
      const newPosts: PostsDto[] = [];
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

              //Coleta a da do post:
              let dataTime: string | null = null;
              if (config[0].selectorDateTime) {
                dataTime = await this.page.$eval(
                  config[0].selectorDateTime,
                  (el) => el.innerHTML,
                );
              }

              //Cria o post:
              const response = await this.createPost(
                linkPost.linkID,
                title,
                content,
                dataTime,
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

  async createPost(
    linkExtractID: number,
    title: string,
    content: string,
    dateTime?: string | null,
  ) {
    return await this.prisma.postCollect.create({
      data: {
        linkExtractID: linkExtractID,
        title: title,
        content: content,
        dateTime: dateTime ? dateTime : null,
      },
    });
  }
}
