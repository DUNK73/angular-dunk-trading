import { TestBed } from '@angular/core/testing';

import { IntrinioService } from './intrinio.service';

describe('IntrinioService', () => {
  let service: IntrinioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntrinioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
