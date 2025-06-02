import { Injectable } from '@nestjs/common';
import { ContentResearcherService } from '../content-researcher.service';

@Injectable()
export class Ge extends ContentResearcherService {
  private readonly url = 'https://ge.globo.com/futebol/times/flamengo/';
  constructor() {
    super();
  }
}
