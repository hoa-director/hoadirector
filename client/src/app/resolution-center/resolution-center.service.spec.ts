import { inject, TestBed } from '@angular/core/testing';

import { ResolutionCenterService } from './resolution-center.service';

describe('ResolutionCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolutionCenterService],
    });
  });

  it('should be created', inject(
    [ResolutionCenterService],
    (service: ResolutionCenterService) => {
      expect(service).toBeTruthy();
    },
  ));
});
