import { TestBed, inject } from '@angular/core/testing';

import { PaginationStateService } from './pagination-state.service';

describe('PaginationStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationStateService]
    });
  });

  it('should be created', inject([PaginationStateService], (service: PaginationStateService) => {
    expect(service).toBeTruthy();
  }));
});
