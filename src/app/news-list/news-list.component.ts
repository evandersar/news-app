import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

import { News } from '../news'

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
  pagination = {
    category: '',
    page: 1,
    ipp: 5,
    total: 50
  };

  constructor(private service: NewsService) { }

  ngOnInit() {
    this.news = this.service.getNews();
  }

  pageChanged(page: number){
    this.pagination.page = page;
  }

  categoryChanged(){
    console.log('this.pagination.category => ', this.pagination.category);
  }

}
