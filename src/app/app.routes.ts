import { Routes } from "@angular/router";
import { NewsListComponent } from "./news-list/news-list.component";
import { ResolveDetailsService } from "./shared/resolve-details.service";
import { ResolveHomeService } from "./shared/resolve-home.service";
import { CanDeactivateGuard } from "./shared/can-deactivate-guard.service";
import { NewsItemComponent } from "./news-item/news-item.component";


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
        component: NewsItemComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
            news: ResolveDetailsService
        }
    },
    {
        path: "add",
        component: NewsItemComponent,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: "**",
        redirectTo: "home"
    }

];
