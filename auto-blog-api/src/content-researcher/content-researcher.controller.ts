import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
//Service
import { ContentResearcherService } from './services/content-researcher.service';
import { ExtractPosts } from './services/extract-posts/extract-posts.content.service';
import { ExtractLinks } from './services/extract-links/extract-links.service';

@Controller('content-researcher')
export class ContentResearcherController {
  constructor(
    private readonly ContentResearcherService: ContentResearcherService,
    private readonly ExtractPosts: ExtractPosts,
    private readonly ExtractLinks: ExtractLinks,
  ) {}

  @Patch('/update-links')
  updateLinks(@Body() dataWebSite: { websiteID: number; urlwebsite: string }) {
    return this.ExtractLinks.extractLinksPosts(dataWebSite);
  }

  @Patch('/update-posts')
  updatePosts(@Body('websiteID') websiteID: number) {
    return this.ExtractPosts.extractPosts(websiteID);
  }

  @Get('/all-posts/:websiteID')
  getAllPost(@Param('websiteID') websiteID: string) {
    return this.ContentResearcherService.getAllposts(+websiteID);
  }
}
