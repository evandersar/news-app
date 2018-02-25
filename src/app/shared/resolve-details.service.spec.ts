import { TestBed, inject } from '@angular/core/testing';

import { ResolveDetailsService } from './resolve-details.service';

describe('ResolveDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveDetailsService]
    });
  });

  it('should be created', inject([ResolveDetailsService], (service: ResolveDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
