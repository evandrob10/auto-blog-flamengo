import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentResearcherModule } from './content-researcher/content-researcher.module';
import { WritersModule } from './writers/writers.module';

@Module({
  imports: [ContentResearcherModule, WritersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
