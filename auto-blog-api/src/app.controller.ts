import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all-posts')
  getAllPosts() {
    return this.appService.getAllPosts();
  }
  @Delete()
  deleteAllPosts() {
    return this.appService.deleteAllPosts();
  }
}
