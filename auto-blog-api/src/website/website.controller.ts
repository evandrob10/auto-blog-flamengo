import { Body, Controller, Get, Param, Post } from '@nestjs/common';
//Services
import { WebsiteService } from './website.service';

@Controller('website')
export class WebsiteController {
  constructor(private readonly WebsiteService: WebsiteService) {}

  @Get('/:url')
  getWebSite(@Param('url') url: string) {
    return this.WebsiteService.getWebSite(url);
  }

  @Get('/all-website')
  getAllWebSite() {
    return this.WebsiteService.getAllWebSite();
  }

  @Post('/add-website')
  createWebsite(@Body('url') url: string) {
    return this.WebsiteService.createWebSite(url);
  }
}
