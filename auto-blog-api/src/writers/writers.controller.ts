import { Controller, Post, Param } from '@nestjs/common';
import { WritersService } from './writers.service';

@Controller('writers')
export class WritersController {
  constructor(private readonly WritersService: WritersService) {}

  @Post('/:userID')
  generationPosts(@Param('userID') userID: string) {
    return this.WritersService.postFinallyInit(+userID);
  }
}
