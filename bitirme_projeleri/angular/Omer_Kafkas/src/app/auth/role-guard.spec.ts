import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { roleGuard } from './role-guard';
import { globalTestConfig } from '../../test-setup';

describe('roleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...globalTestConfig.providers]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
