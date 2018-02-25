import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { NewsService } from '../news.service';
import { News } from '../news'
import { Pagination } from '../pagination';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news: News[];
  categories = [
    { value: '', display: 'All' },
    { value: 'health', display: 'Health' },
    { value: 'life', display: 'Life' },
    { value: 'food', display: 'Food' }
  ];
  ipps = [5, 10, 20];
  pagination: Pagination;

  constructor(private service: NewsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.news = this.service.getNews();
    this.activatedRoute.data.forEach((data: { paginationObj: Pagination }) => {
      this.pagination = data.paginationObj;
    });
    this.getPage();
  }

  pageChanged(page: number) {
    this.pagination.page = page;
    console.log('this.pagination.page => ', this.pagination);
    this.getPage();
  }

  categoryChanged() {
    console.log('this.pagination.category => ', this.pagination);
    this.getPage();
  }

  ippChanged() {
    console.log('this.pagination.ipp => ', this.pagination);
    this.getPage();
  }

  getPage() {
    this.pagination.loading = true;
    this.service.serverCall(this.pagination)
      .do(res => {
        this.pagination.total = res.total;
        this.pagination.loading = false;
        console.log('this.pagination => ', this.pagination);
      })
      .map(res => res.items)
      .subscribe(
        news => {
          console.log('news => ', news);
          this.news = news;
        },
        err => console.log(err)
      );
  }

}
