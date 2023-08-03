import { Test, TestingModule } from '@nestjs/testing';
import { SharedPointsGateway } from './shared-points.gateway';

describe('SharedPointsGateway', () => {
  let gateway: SharedPointsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedPointsGateway],
    }).compile();

    gateway = module.get<SharedPointsGateway>(SharedPointsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
