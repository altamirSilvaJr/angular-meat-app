import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { Order } from "./order.model";
import { MEAT_API } from "../app.api";

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: HttpClient){}

    cartItems(): CartItem[]{
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.removeItem(item)
    }

    itemsValue(): number {
        return this.cartService.total()
    }

    checkOrder(order: Order): Observable<string>{
        const body = JSON.stringify(order)
        return this.http.post<Order>(`${MEAT_API}/orders`, body).pipe(
            map(order => order.id)
        )
    }

    clear(){
        this.cartService.clear()
    }
}