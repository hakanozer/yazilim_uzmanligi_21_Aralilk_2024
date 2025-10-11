import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notauthGuard } from './notauth.guard';

describe('notauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
