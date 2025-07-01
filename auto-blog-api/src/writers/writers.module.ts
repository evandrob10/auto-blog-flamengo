import { Module } from '@nestjs/common';
import { WritersController } from './writers.controller';
import { WritersService } from './writers.service';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { ContentResearcherModule } from 'src/content-researcher/content-researcher.module';
import { ContentResearcherService } from 'src/content-researcher/services/content-researcher.service';

@Module({
  imports: [PrismaClientModule, ContentResearcherModule],
  controllers: [WritersController],
  providers: [WritersService, ContentResearcherService],
  exports: [WritersService],
})
export class WritersModule {}
