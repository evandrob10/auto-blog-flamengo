import { Injectable } from '@nestjs/common';
//IA
import { genkit } from 'genkit';
import { googleAI, gemini } from '@genkit-ai/googleai';
//prisma
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { PostFinallyType } from './dto/CreatePostFinally.dto';

@Injectable()
export class WritersService {
  constructor(private readonly prisma: PrismaClientService) {}

  private ia = genkit({
    plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
    model: gemini('gemini-1.5-flash'),
  });
  async createContent(prompt: string) {
    const { text } = await this.ia.generate({
      messages: [
        {
          role: 'user',
          content: [
            {
              text: 'Você é um especialista brasileiro em escrever artigos para blog. Pesquise tudo sobre artigo para blog, Como aplicar SEO(estrutura e tudo mais).',
            },
          ], // Include the large text as context
        },
      ],
      prompt: prompt,
    });
    return {
      text,
    };
  }

  filterPrompt(textBasic: string, sectionPost: string): string | null {
    switch (sectionPost) {
      case 'main':
        return `Com base, pegue o seguinte texto: "${textBasic}" rescreva com seu conhecimento, evitando direito autorais. Com no minimo 900 palavras. Caso tenha acesso vá na internet e pesquise além da base(apenas um texto não varios pfv e só texto não precisa de explicação. Não use *, ## ou # ) os sub titulo coloque h2 e h3`;
      case 'title':
        return `Com base no seguinte texto: "${textBasic}" e no seu conhecimento, crie um titulo(apenas um titulo não varios pfv e só titulo não precisa de explicação. Não use * ou #). `;
      case 'keywords':
        return `Com base no seguinte texto: "${textBasic}" e no seu conhecimento, crie um array com palavras chaves encontradas.(apenas um array não varios pfv e só array não precisa de explicação ou coloca javascript. Não use * ou #) `;
      case 'summary':
        return `Com base no seguinte texto: "${textBasic}" e no seu conhecimento, crie um resumo para aparecer na hora da busca do usuario no google aquele que fica em baixo title. (apenas um resumo não varios pfv e só resumo não precisa de explicação. Não use * ou #)`;
      default:
        return null;
    }
  }

  async registerPost(
    authorID: number,
    textBasic: string,
    postCollectID: number,
  ) {
    const mainPrompt = this.filterPrompt(textBasic, 'main');
    const main = mainPrompt && (await this.createContent(mainPrompt)).text;
    const mainTitle = main && this.filterPrompt(main, 'title');
    const mainKeywords = main && this.filterPrompt(main, 'keywords');
    const mainSummary = main && this.filterPrompt(main, 'summary');
    const title = mainTitle && (await this.createContent(mainTitle)).text;
    const keywords =
      mainKeywords && (await this.createContent(mainKeywords)).text;
    const summary = mainSummary && (await this.createContent(mainSummary)).text;

    if (title && main && keywords && summary) {
      return await this.prisma.postFinally.create({
        data: {
          title: title,
          content: main,
          summary: summary,
          keywords: keywords,
          authorID: authorID,
          featuredPost: '',
          postCollectID: postCollectID,
        },
      });
    }
    return {
      error: 'ocorreu erro ao tentar criar o post!',
    };
  }

  async checkPostFinally(
    postCollectID: number,
  ): Promise<PostFinallyType | null> {
    return await this.prisma.postFinally.findUnique({
      where: { postCollectID: postCollectID },
    });
  }

  async postFinallyInit(userID: number) {
    const postCollect = await this.prisma.postCollect.findMany({});
    let count = 0;
    if (postCollect) {
      for (const post of postCollect) {
        const checkPost: PostFinallyType | null = await this.checkPostFinally(
          post.postCollectID,
        );
        if (count > 1) break;
        if (checkPost) continue;
        await this.registerPost(userID, post.content, post.postCollectID);
        count += 1;
      }
    }
    return {
      quantity: count,
    };
  }
}
