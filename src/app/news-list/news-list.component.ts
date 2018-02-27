import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { NewsService } from '../shared/news.service';
import { News } from '../shared/news'
import { Pagination } from '../shared/pagination';

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
  ipps = [1, 3, 5];
  pagination: Pagination;

  constructor(private service: NewsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.news = this.service.getNews();
    this.activatedRoute.data.forEach((data: { paginationObj: Pagination }) => {
      this.pagination = data.paginationObj;
    });
    //this.getPage();
    this.getNews();
  }

  getNews() {
    this.pagination.loading = true;
    this.service.getNews(this.pagination)
      .subscribe(resp => {
        // Here, resp is of type HttpResponse<MyJsonData>.
        // You can inspect its headers:
        console.log(resp.headers.get('x-total-count'));
        // And access the body directly, which is typed as MyJsonData as requested.
        console.log(resp.body);
        this.pagination.loading = false;
        this.pagination.total = resp.headers.get('x-total-count');
        this.news = resp.body;
      },
        err => console.log(err)
      );
  }

  pageChanged(page: number) {
    this.pagination.page = page;
    this.getNews();
  }

  getPage() {
    this.pagination.loading = true;
    this.service.serverAll(this.pagination)
      .do(res => {
        this.pagination.total = res.total;
        this.pagination.loading = false;
      })
      .map(res => res.items)
      .subscribe(
        news => {
          //console.log('news => ', news);
          this.news = news;
        },
        err => console.log(err)
      );
  }

}
