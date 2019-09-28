import { TestBed, inject } from '@angular/core/testing';

import { EnvelopeService } from './envelope.service';

describe('EnvelopeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvelopeService]
    });
  });

  it('should be created', inject([EnvelopeService], (service: EnvelopeService) => {
    expect(service).toBeTruthy();
  }));
});
