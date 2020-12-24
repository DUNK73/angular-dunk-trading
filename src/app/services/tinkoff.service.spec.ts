/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TinkoffService } from './tinkoff.service';

describe('Service: Tinkoff', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TinkoffService]
    });
  });

  it('should ...', inject([TinkoffService], (service: TinkoffService) => {
    expect(service).toBeTruthy();
  }));
});
