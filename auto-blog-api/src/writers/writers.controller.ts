import { Controller, Post, Param, Get } from '@nestjs/common';
import { WritersService } from './writers.service';

@Controller('writers')
export class WritersController {
  constructor(private readonly WritersService: WritersService) {}

  @Post('/:userID')
  generationPosts(@Param('userID') userID: string) {}
  @Get('/all-posts/:websiteID')
  postsCollect(@Param('websiteID') websiteID: string) {
    const prompt =
      'Com base nos textos enviados anteriomente, crie um titulo, texto com no minimo 900 palavras, palavras chaves, e slug.';
    return this.WritersService.createContent(prompt, [''], +websiteID);
  }
}
