import { Injectable } from '@angular/core';
import { Pagination } from './pagination';

@Injectable()
export class PaginationStateService {
  
  pagination: Pagination = {
    category: '',
    page: 1,
    ipp: 3,
    total: 0,
    loading: false
  };
  
  constructor() { }

}
