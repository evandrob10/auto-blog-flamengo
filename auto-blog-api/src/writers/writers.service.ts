import { Injectable } from '@nestjs/common';
//IA
import { genkit } from 'genkit';
import { googleAI, gemini } from '@genkit-ai/googleai';
//prisma
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { ContentResearcherService } from 'src/content-researcher/services/content-researcher.service';

@Injectable()
export class WritersService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly ResearcherService: ContentResearcherService,
  ) {}

  private ia = genkit({
    plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
    model: gemini('gemini-1.5-flash'),
  });
  async createContent(prompt: string, content?: string[], websiteID?: number) {
    if (websiteID) {
      const contentBasic = await this.contentCollect(websiteID);

      const { text } = await this.ia.generate({
        messages: [
          {
            role: 'user',
            content: [
              {
                text: 'Estude tudo sobre SEO, Artigos, palavras-chaves, densidade de palavras chaves e outros.',
              },
            ],
          },
          {
            role: 'user',
            content: content ? content : contentBasic,
          },
        ],
        prompt: prompt,
      });
      return {
        text,
      };
    }
    return {
      message: 'error ao gerar conteúdo!',
    };
  }

  async promptKeyWord(context: string) {
    if (context) {
      return this.createContent(
        `Com base no ${context}, crie uma palavra-chave`,
      );
    }
    return this.createContent(
      'Com base nos textos anteriores, crie uma palavra-chave',
    );
  }

  async promptThema(keyWord: string) {
    return await this.createContent(
      `Crie um tema com a palavra-chave: ${keyWord}. retorne apenas o tema, Exemplo: “Como plantar suculentas em casa”`,
    );
  }

  async promptContent(
    thema: string,
    callAction: string,
    ToneOfVoice: string,
    targetAudience: string,
    SecondaryKeywords: string[],
    links: string[],
  ) {
    //Links:
    let contentLink: string = '';
    if (links.length) {
      for (const link of links) contentLink += `${link}, `;
    }
    //Palavras chaves secundarias:
    let Keywords: string = '';
    if (SecondaryKeywords.length) {
      for (const Keyword of SecondaryKeywords) Keywords += `${Keyword}, `;
    }

    return this.createContent(
      `Com os textos, crie um artigo completo, bem estruturado e otimizado para SEO com base nas seguintes diretrizes:
      
      1. Tema Principal:
      ${thema};
      Exemplo: “Como plantar suculentas em casa”

      2. Estrutura do Artigo:

      Título Principal (H1): Atraente e com a palavra-chave principal.

      Introdução: Breve parágrafo introdutório que contextualiza o tema, inclui a palavra-chave principal e estimula o leitor a continuar lendo.

      Subtítulos (H2, H3): Organize o conteúdo com subtítulos relevantes. Utilize palavras-chave secundárias e sinônimos.

      Parágrafos Curtos: Linguagem clara, objetiva e de fácil leitura. Use listas, negrito e exemplos, se necessário.

      Uso Estratégico de Palavras-chave: Distribua a palavra-chave principal e secundárias de forma natural ao longo do texto (densidade ideal: 1% a 2%).

      Conteúdo Original e de Valor: Traga informações úteis, completas e confiáveis. Evite conteúdo superficial ou duplicado.

      Call to Action (CTA): Encerre com um convite à ação: ${callAction} (ex: comentar, compartilhar, comprar, assinar). 

      3. Público-alvo:
      [Defina o público-alvo: ${targetAudience} ex. iniciantes, profissionais, curiosos, etc.]

      4. Tom de Voz: ${ToneOfVoice}
      [Ex: informal, técnico, didático, inspirador, profissional...]
      
      ${
        Keywords && '5. Palavras-chave secundárias (opcional): ' + Keywords
      }     
      ${contentLink && 'inclua de form dinamica ao decorrer do texto os seguintes links ' + contentLink}
      `,
    );
  }

  async promptMetaDescription(content: string) {
    return await this.createContent(
      `Com base no texto: ${content}, Crie uma meta Descrição (até 160 caracteres): Resumo atrativo do artigo contendo a palavra-chave.`,
    );
  }

  async contentCollect(websiteID: number) {
    const posts = await this.ResearcherService.getAllposts(websiteID);
    const newPosts = posts
      .filter((post) => post.postCollect !== null)
      .map((post, index) => {
        return {
          text: `texto ${index + 1}: Titulo : ${post.postCollect?.title} conteudo: ${post.postCollect?.content} data de publicação: ${post.postCollect?.dateTime}`,
        };
      });
    return newPosts;
  }
}
/* 
Aqui está um prompt que você pode usar (ou adaptar) para treinar um modelo — ou orientar a si mesmo ou uma IA — a criar artigos completos otimizados para SEO:

📝 Prompt para Criar Artigos Completos Otimizados para SEO
Instruções:

1. Tema Principal: - Ok
[Insira aqui o tema principal ou palavra-chave foco do artigo]
Exemplo: “Como plantar suculentas em casa”

2. Estrutura do Artigo: - OK

Título Principal (H1): Atraente e com a palavra-chave principal.

Introdução: Breve parágrafo introdutório que contextualiza o tema, inclui a palavra-chave principal e estimula o leitor a continuar lendo.

Subtítulos (H2, H3): Organize o conteúdo com subtítulos relevantes. Utilize palavras-chave secundárias e sinônimos.

Parágrafos Curtos: Linguagem clara, objetiva e de fácil leitura. Use listas, negrito e exemplos, se necessário.

Uso Estratégico de Palavras-chave: Distribua a palavra-chave principal e secundárias de forma natural ao longo do texto (densidade ideal: 1% a 2%).

Conteúdo Original e de Valor: Traga informações úteis, completas e confiáveis. Evite conteúdo superficial ou duplicado.

Call to Action (CTA): Encerre com um convite à ação (ex: comentar, compartilhar, comprar, assinar).

Meta Descrição (até 160 caracteres): Resumo atrativo do artigo contendo a palavra-chave.

3. Público-alvo: - Ok
[Defina o público-alvo: ex. iniciantes, profissionais, curiosos, etc.]

4. Tom de Voz: - OK
[Ex: informal, técnico, didático, inspirador, profissional...]

5. Palavras-chave secundárias (opcional): - OK
[Liste palavras-chave relacionadas ao tema]

✅ Exemplo de Uso:
Tema Principal: "Alimentos que ajudam na imunidade"
Público-alvo: Adultos interessados em saúde e nutrição
Tom de voz: Didático e amigável
Palavras-chave secundárias: vitamina C, alimentação saudável, sistema imunológico

Deseja que eu gere um exemplo de artigo com base nesse prompt? 
*/
