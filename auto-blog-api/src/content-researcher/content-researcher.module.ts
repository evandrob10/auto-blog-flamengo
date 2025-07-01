import { Module } from '@nestjs/common';
import { ContentResearcherController } from './content-researcher.controller';
import { ContentResearcherService } from './services/content-researcher.service';
import { ExtractPosts } from './services/extract-posts/extract-posts.content.service';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { WebsiteModule } from 'src/website/website.module';
import { ConfigPage } from './services/config-page/config-page.service';
import { ExtractLinks } from './services/extract-links/extract-links.service';

@Module({
  imports: [PrismaClientModule, WebsiteModule],
  controllers: [ContentResearcherController],
  providers: [ContentResearcherService, ExtractPosts, ExtractLinks, ConfigPage],
  exports: [ContentResearcherService],
})
export class ContentResearcherModule {}
