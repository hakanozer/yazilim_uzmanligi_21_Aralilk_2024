import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { notAuthGuard } from './not-auth-guard';
import { globalTestConfig } from '../../test-setup';

describe('notAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...globalTestConfig.providers]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
