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
  pagination = {
    category: ''
  };

  constructor(private service: NewsService) { }

  ngOnInit() {
    this.news = this.service.getNews();
  }

}
