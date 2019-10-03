import { TestBed, inject } from '@angular/core/testing';

import { PiggybankService } from './piggybank.service';

describe('BillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiggybankService]
    });
  });

  it('should be created', inject([PiggybankService], (service: PiggybankService) => {
    expect(service).toBeTruthy();
  }));
});
