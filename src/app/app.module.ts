import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsService } from './news.service';
import { PaginationStateService } from './pagination-state.service';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    CreateNewsComponent,
    NewsDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    NewsService, 
    PaginationStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
