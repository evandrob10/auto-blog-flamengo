import { Injectable } from '@nestjs/common';
import { ContentResearcherService } from '../content-researcher.service';

@Injectable()
export class Colun extends ContentResearcherService {
  private readonly url = 'https://colunadofla.com/ultimas-noticias/';
  constructor() {
    super();
  }
}
