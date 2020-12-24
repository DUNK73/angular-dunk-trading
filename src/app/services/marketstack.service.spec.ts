import { TestBed } from '@angular/core/testing';

import { MarketstackService } from './marketstack.service';

describe('MarketstackService', () => {
  let service: MarketstackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketstackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
