import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

    checkOrder(order: Order): Observable<any>{
        const headers = {'Content-Type': 'application/json'}
        const body = JSON.stringify(order)
        console.log(body)
        return this.http.post(`${MEAT_API}/orders`, body, {headers})
    }

    clear(){
        this.cartService.clear()
    }
}