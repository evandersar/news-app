import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { routes } from "./app.routes";
import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsService } from './news.service';
import { PaginationStateService } from './pagination-state.service';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { ResolveDetailsService } from './resolve-details.service';
import { ResolveHomeService } from './resolve-home.service';


@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    CreateNewsComponent,
    NewsDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
  providers: [
    NewsService, 
    PaginationStateService,
    ResolveDetailsService,
    ResolveHomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
