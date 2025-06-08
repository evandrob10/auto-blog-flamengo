import { Injectable } from '@nestjs/common';
//DTO'S
import { PostsDto } from './dto/posts.dto';
//Services
import { WritersService } from 'src/writers/writers.service';
import { ContentResearcherService } from '../content-researcher.service';
import { PrismaClientService } from 'src/prisma-client/prisma-client.service';

@Injectable()
export class ExtractPosts extends ContentResearcherService {
  constructor(prisma: PrismaClientService, WritersService: WritersService) {
    super(prisma, WritersService);
  }

  //Checar post/link
  async ckeckPost(linkID: number) {
    return this.prisma.postCollect.findUnique({
      where: { linkExtractID: linkID },
    });
  }

  async extractPosts(websiteID: number) {
    const newPosts: {
      postCollectID: number;
      title: string;
      content: string;
      linkExtractID: number;
    }[] = [];
    if (websiteID) {
      //Nova page para cada extração:
      await this.browserInit();
      await this.createSectionsPage();
      //Pegar todos os links:
      const linksPosts: { linkID: number; link: string }[] =
        await this.getAllLinks(websiteID);
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
