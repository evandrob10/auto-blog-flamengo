import { Module } from '@nestjs/common';
import { ContentResearcherController } from './content-researcher.controller';
import { ContentResearcherService } from './services/content-researcher.service';
import { Colun } from './services/pages-content-researcher/colun.content.service';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { WritersModule } from 'src/writers/writers.module';

@Module({
  imports: [PrismaClientModule, WritersModule],
  controllers: [ContentResearcherController],
  providers: [ContentResearcherService, Colun],
})
export class ContentResearcherModule {}
