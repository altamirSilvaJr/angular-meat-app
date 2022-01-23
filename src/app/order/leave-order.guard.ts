import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { OrderComponent } from "./order.component";

export class LeaveOrderGuard implements CanDeactivate<OrderComponent>{
    canDeactivate(OrderComponent: OrderComponent, 
        activatedRoute: ActivatedRouteSnapshot, 
        routerState: RouterStateSnapshot): boolean{
        if(!OrderComponent.isOrderCompleted()){
            return window.confirm('Deseja desistir da compra?')
        }else{
            return true
        }
    }
}