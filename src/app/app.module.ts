import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsService } from './news.service';
import { PaginationStateService } from './pagination-state.service';


@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent
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
