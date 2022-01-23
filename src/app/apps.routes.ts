import { Routes } from "@angular/router"
import { HomeComponent } from "./home/home.component"
import { MenuComponent } from "./restaurant-detail/menu/menu.component"
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component"
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component"
import { RestaurantsComponent } from "./restaurants/restaurants.component"
import { OrderSummaryComponent } from "./order-summary/order-summary.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { LoginComponent } from "./security/login/login.component"
import { LoggedInGuard } from "./security/loggedin.guard"

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login/:to', component: LoginComponent},
    {path: 'about', loadChildren: () => import('./about/about.module').then(x => x.AboutModule)},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
        children:[
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]
    },
    {path: 'order', loadChildren: () => import('./order/order.module').then(x => x.OrderModule), canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
    {path: 'order-summary', component: OrderSummaryComponent},
    {path: '**', component: NotFoundComponent}
]