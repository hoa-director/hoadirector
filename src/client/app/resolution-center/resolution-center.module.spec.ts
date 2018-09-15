import { ResolutionCenterModule } from './resolution-center.module';

describe('ResolutionCenterModule', () => {
  let resolutionCenterModule: ResolutionCenterModule;

  beforeEach(() => {
    resolutionCenterModule = new ResolutionCenterModule();
  });

  it('should create an instance', () => {
    expect(resolutionCenterModule).toBeTruthy();
  });
});
