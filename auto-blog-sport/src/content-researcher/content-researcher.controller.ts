import { Controller, Get } from '@nestjs/common';
//Service
import { ContentResearcherService } from './services/content-researcher.service';

@Controller('content-researcher')
export class ContentResearcherController {
  constructor(
    private readonly ContentResearcherService: ContentResearcherService,
  ) {}

  @Get()
  browserInit() {
    return this.ContentResearcherService.browserInit();
  }
}
