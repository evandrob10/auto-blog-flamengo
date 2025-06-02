import { Injectable } from '@nestjs/common';
import { ContentResearcherService } from '../content-researcher.service';

@Injectable()
export class Espn extends ContentResearcherService {
  private readonly url =
    'https://www.espn.com.br/futebol/time/_/id/819/flamengo';

  constructor() {
    super();
  }
}
