import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { fascesGuard } from './fasces-guard';

describe('fascesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => fascesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
