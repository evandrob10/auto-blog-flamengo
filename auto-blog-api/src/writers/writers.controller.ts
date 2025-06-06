import { Controller, Post } from '@nestjs/common';
import { WritersService } from './writers.service';

@Controller('writers')
export class WritersController {
  constructor(private readonly WritersService: WritersService) {}

  @Post('')
  generationPosts() {
    return this.WritersService.postFinallyInit();
  }
}
