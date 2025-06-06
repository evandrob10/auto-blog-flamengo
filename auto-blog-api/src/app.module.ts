import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentResearcherModule } from './content-researcher/content-researcher.module';
import { WritersModule } from './writers/writers.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaClientModule } from './prisma-client/prisma-client.module';

@Module({
  imports: [
    ContentResearcherModule,
    PrismaClientModule,
    WritersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
