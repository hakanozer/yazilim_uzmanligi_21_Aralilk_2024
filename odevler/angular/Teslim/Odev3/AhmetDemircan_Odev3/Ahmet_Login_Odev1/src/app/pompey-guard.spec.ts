import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pompeyGuard } from './pompey-guard';

describe('pompeyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pompeyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
