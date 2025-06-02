import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';

@Injectable()
export class ContentResearcherService {
  protected browser: Browser;
  protected page: Page;

  async browserInit(): Promise<void> {
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await this.createSectionsPage();
  }

  async createSectionsPage(): Promise<Page> {
    const page = await this.browser.newPage();
    return page;
  }

  async openPage(url: string): Promise<void> {
    try {
      await this.page.goto(url);
      await this.page.waitForNetworkIdle();
    } catch {
      console.log('Houve error ao carregar pagina!');
    }
  }

  async closePage() {
    return await this.browser.close();
  }
}
