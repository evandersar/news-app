import { Injectable } from '@angular/core';
import { Pagination } from './pagination';
import { Resolve } from '@angular/router';
import { PaginationStateService } from './pagination-state.service';

@Injectable()
export class ResolveHomeService implements Resolve<Pagination>{

  constructor(private service: PaginationStateService) {}

   resolve(): Pagination {
    return this.service.pagination;
  }

}
