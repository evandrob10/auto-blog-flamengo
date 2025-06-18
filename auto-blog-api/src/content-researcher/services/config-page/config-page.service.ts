import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';

@Injectable()
export class ConfigPage {
  protected browser: Browser;
  protected page: Page;

  constructor() {}

  //Configuração das paginas:

  async browserInit(): Promise<void> {
    this.browser = await puppeteer.launch({
      userDataDir: './cache',
    });
    this.page = await this.createSectionsPage();
    await this.blockAds();
  }

  async createSectionsPage(): Promise<Page> {
    const page = await this.browser.pages();
    return page[0];
  }

  async blockAds() {
    //Bloquear anuncio:
    await this.page.setRequestInterception(true);
    //Dominios de anuncios bloqueados:
    const blockedDomains = [
      'doubleclick.net',
      'googlesyndication.com',
      'google-analytics.com',
      'adservice.google.com',
      'ads.yahoo.com',
      'facebookads',
      'adnxs.com',
    ];
    //Capturando as requsições e bloqueando as urls
    this.page.on('request', (request) => {
      const url = request.url();
      // Verifica se a URL bate com alguma das redes de anúncio
      if (blockedDomains.some((domain) => url.includes(domain))) {
        void request.abort(); // Bloqueia a requisição
      } else {
        void request.continue(); // Permite a requisição normalmente
      }
    });
  }

  async openPage(
    url: string,
    selector?: { type: string; value: string },
  ): Promise<void> {
    try {
      //Indica para puppeter ir para url enviada por parametro
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
      //Espera o carregamento por tipo de seletor:
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
      await this.closeBrowser();
      await this.browserInit();
    }
  }
  //Fecha o browser:
  async closeBrowser() {
    return await this.browser.close();
  }
}
