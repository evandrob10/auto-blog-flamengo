import { Body, Controller, Get, Param, Post } from '@nestjs/common';
//Service
import { ContentResearcherService } from './services/content-researcher.service';
import { Colun } from './services/pages-content-researcher/colun.content.service';

@Controller('content-researcher')
export class ContentResearcherController {
  constructor(
    private readonly ContentResearcherService: ContentResearcherService,
    private readonly Colun: Colun,
  ) {}

  @Get('/all-website')
  getAllWebSite() {
    return this.Colun.getAllWebSite();
  }

  @Get('/all-posts/:websiteID')
  getAllPost(@Param('websiteID') websiteID: string) {
    return this.Colun.getAllposts(+websiteID);
  }

  @Post('/update-posts-colun')
  updatePosts() {
    return this.Colun.updatePosts();
  }

  @Post('/add-website')
  createWebsite(@Body('url') url: string) {
    return this.ContentResearcherService.createWebSite(url);
  }
}
