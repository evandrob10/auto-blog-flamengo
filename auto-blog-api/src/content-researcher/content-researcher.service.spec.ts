import { Test, TestingModule } from '@nestjs/testing';
import { ContentResearcherService } from './services/content-researcher.service';

describe('ContentResearcherService', () => {
  let service: ContentResearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentResearcherService],
    }).compile();

    service = module.get<ContentResearcherService>(ContentResearcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
