import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';

@Injectable()
export class ConfigPage {
  protected browser: Browser;
  protected page: Page;

  constructor() {}

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
