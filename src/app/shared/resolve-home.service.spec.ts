import { TestBed, inject } from '@angular/core/testing';

import { ResolveHomeService } from './resolve-home.service';

describe('ResolveHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveHomeService]
    });
  });

  it('should be created', inject([ResolveHomeService], (service: ResolveHomeService) => {
    expect(service).toBeTruthy();
  }));
});
