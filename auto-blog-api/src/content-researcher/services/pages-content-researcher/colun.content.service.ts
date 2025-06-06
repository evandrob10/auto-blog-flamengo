import { Injectable } from '@nestjs/common';
import { ContentResearcherService } from '../content-researcher.service';
import { LinksPostsDto, PostsDto } from './dto/posts.dto';
import { WritersService } from 'src/writers/writers.service';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class Colun extends ContentResearcherService {
  private dataWebSite: { websiteID: number; urlwebsite: string } | null;
  private readonly url = 'https://colunadofla.com/ultimas-noticias/';

  constructor(prisma: PrismaClientService, WritersService: WritersService) {
    super(prisma, WritersService);
  }

  async onModuleInit() {
    this.dataWebSite = await this.getWebSite(this.url);
  }

  async updatePosts() {
    await this.getLinksPosts();
    return await this.extractPosts();
  }

  async getLinksPosts() {
    await this.browserInit();
    await this.openPage(this.url, { type: 'selector', value: '.p-url' });
    if (this.dataWebSite) {
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
          if (!href)
            await this.createLink(this.dataWebSite.websiteID, link.href);
          else continue;
        } else {
          continue;
        }
      }
    }
    await this.closePage();
  }

  async extractPosts() {
    const newPosts: {
      postCollectID: number;
      title: string;
      content: string;
      linkExtractID: number;
    }[] = [];
    if (this.dataWebSite) {
      console.log('executado');
      //Nova page para cada extração:
      await this.browserInit();
      await this.createSectionsPage();
      //Pegar todos os links:
      const linksPosts: { linkID: number; link: string }[] =
        await this.getAllLinks(this.dataWebSite.websiteID);
      //Carregamento:
      let count: number = 0;
      for (const linkPost of linksPosts) {
        //Verifica se link ja tem post na db:
        const post = await this.ckeckPost(linkPost.linkID);
        //Extrair post:
        if (linkPost.link && !post) {
          await this.openPage(linkPost.link, {
            type: 'selector',
            value: 'h1',
          });
          //Seleciona os dados:
          const post: PostsDto = await this.page.evaluate(() => {
            const h1 = document.querySelector('h1')?.innerText;
            let content = '';
            const listOfContent = document.querySelectorAll('.e-ct-outer p');
            listOfContent.forEach((element) => (content += element.innerHTML));
            return {
              title: h1 ? h1 : '',
              content: content,
            };
          });
          //Cria o post:
          const response = await this.createPost(
            linkPost.linkID,
            post.title,
            post.content,
          );
          newPosts.push(response);
          count += 1;
        }
        //Limita a importação de 5 por vez!
        if (count > 4) break;
      }
      await this.closePage();

      return newPosts;
    }
  }
}
