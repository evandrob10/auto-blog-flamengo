import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all-posts/:userID')
  getAllPosts(@Param('userID') userID: string) {
    return this.appService.getAllPosts(+userID);
  }
  @Delete()
  deleteAllPosts() {
    return this.appService.deleteAllPosts();
  }
}
