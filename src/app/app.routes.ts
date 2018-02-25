import { Routes } from "@angular/router";
import { NewsListComponent } from "./news-list/news-list.component";
import { NewsDetailsComponent } from "./news-details/news-details.component";
import { ResolveDetailsService } from "./shared/resolve-details.service";
import { CreateNewsComponent } from "./create-news/create-news.component";
import { ResolveHomeService } from "./shared/resolve-home.service";
import { CanDeactivateGuard } from "./shared/can-deactivate-guard.service";


export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: NewsListComponent,
        resolve: {
            paginationObj: ResolveHomeService
        }
    },
    {
        path: "news/:id",
        component: NewsDetailsComponent,
        resolve: {
            news: ResolveDetailsService
        }
    },
    {
        path: "add",
        component: CreateNewsComponent,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: "**",
        redirectTo: "home"
    }

];
