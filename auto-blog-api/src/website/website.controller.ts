import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
//Services
import { WebsiteService } from './website.service';
//DTO'S
import { CreateConfigDto } from './dto/createWebConfig.dto';
import { updateWebConfig } from './dto/updateWebConfig';

@Controller('website')
export class WebsiteController {
  constructor(private readonly WebsiteService: WebsiteService) {}

  @Get('/web-config/:websiteID')
  getWebConfig(@Param('websiteID') websiteID: string) {
    return this.WebsiteService.getWebConfig(+websiteID);
  }

  @Get('/all-website')
  getAllWebSite() {
    return this.WebsiteService.getAllWebSite();
  }

  @Get('/:url')
  getWebSite(@Param('url') url: string) {
    return this.WebsiteService.getWebSite(url);
  }

  @Post('/add-config')
  createWebConfig(@Body() webConfig: CreateConfigDto) {
    return this.WebsiteService.createWebConfig(webConfig);
  }

  @Post('/add-website')
  createWebsite(@Body('url') url: string) {
    return this.WebsiteService.createWebSite(url);
  }

  @Patch('/update-web-config/:websiteID')
  updateWebConfig(
    @Param('websiteID') websiteID: string,
    @Body() webConfig: updateWebConfig,
  ) {
    return this.WebsiteService.updateWebConfig(+websiteID, webConfig);
  }
}
