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

  constructor(private service: NewsService) { }

  ngOnInit() {
    this.news = this.service.getNews();
  }

}
