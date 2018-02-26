import { TestBed, inject } from '@angular/core/testing';

import { ApplicantStateService } from './applicant-state.service';

describe('ApplicantStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicantStateService]
    });
  });

  it('should be created', inject([ApplicantStateService], (service: ApplicantStateService) => {
    expect(service).toBeTruthy();
  }));
});
