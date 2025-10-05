import { TestBed } from '@angular/core/testing';

import { EnrollmentsService } from './enrollments.service';

describe('EnrollmentsService', () => {
  let service: EnrollmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
