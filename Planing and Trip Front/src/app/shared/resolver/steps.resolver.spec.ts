import { TestBed } from '@angular/core/testing';

import { StepsResolver } from './steps.resolver';

describe('StepsResolver', () => {
  let resolver: StepsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StepsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
