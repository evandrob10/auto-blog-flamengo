import { Test, TestingModule } from '@nestjs/testing';
import { ContentResearcherController } from './content-researcher.controller';

describe('ContentResearcherController', () => {
  let controller: ContentResearcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentResearcherController],
    }).compile();

    controller = module.get<ContentResearcherController>(
      ContentResearcherController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
