import { TestBed } from '@angular/core/testing';

import { LeftPanelServiceService } from './left-panel-service.service';

describe('LeftPanelServiceService', () => {
  let service: LeftPanelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftPanelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
