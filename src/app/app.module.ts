import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { routes } from "./app.routes";
import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsService } from './shared/news.service';
import { PaginationStateService } from './shared/pagination-state.service';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { ResolveDetailsService } from './shared/resolve-details.service';
import { ResolveHomeService } from './shared/resolve-home.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';


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
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [
    NewsService,
    PaginationStateService,
    ResolveDetailsService,
    ResolveHomeService,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
