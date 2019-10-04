import { TestBed, inject } from '@angular/core/testing';

import { AddpaymentmethodService } from './addpaymentmethod.service';

describe('AddpaymentmethodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddpaymentmethodService]
    });
  });

  it('should be created', inject([AddpaymentmethodService], (service: AddpaymentmethodService) => {
    expect(service).toBeTruthy();
  }));
});
