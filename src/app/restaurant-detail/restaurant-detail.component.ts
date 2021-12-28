import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurants/restaurant/restaurant.model';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant

  constructor(private restaurantService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurantService.restaurantsById(this.route.snapshot.params['id']).subscribe(restaurant => this.restaurant = restaurant)
  }

}
