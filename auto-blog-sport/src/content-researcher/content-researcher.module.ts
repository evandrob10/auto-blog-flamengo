import { Module } from '@nestjs/common';
import { ContentResearcherController } from './content-researcher.controller';
import { ContentResearcherService } from './services/content-researcher.service';

@Module({
  controllers: [ContentResearcherController],
  providers: [ContentResearcherService],
})
export class ContentResearcherModule {}
