import { TestBed } from '@angular/core/testing';
import { Api } from './api';
import { globalTestConfig } from '../test-setup';

describe('Api', () => {
  let service: Api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...globalTestConfig.providers]
    });
    service = TestBed.inject(Api);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
