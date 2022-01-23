import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from "../app.api";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = new HttpParams()
    if(search){
      params = new HttpParams().set('q', search)
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params});
  }

  restaurantsById(id: string): Observable<Restaurant>{
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
  }
  
  reviewsOfRestaurant(id: string): Observable<any>{
    return this.http.get<any>(`${MEAT_API}/restaurants/${id}/reviews`);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]>{
    return this.http.get<any>(`${MEAT_API}/restaurants/${id}/menu`);
  }
}