import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { NewsService } from './news.service';
import { News } from './news';

@Injectable()
export class ResolveDetailsService implements Resolve<News>{

  constructor(private service: NewsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): News | any {

    let id = +route.params["id"];
    //let currNews = this.service.serverOne(id);
    let currNews = this.service.getOneNews(id);

    if (currNews) {
      return currNews;
    }
    else {
      this.router.navigate(['/movies']);
      return false;
    }
  }

}
