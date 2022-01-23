import { animate, state, style, trigger, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { switchMap, tap, debounceTime, catchError, Observable, from, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'

  restaurants: Restaurant[];

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantsService: RestaurantsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm =>
        this.restaurantsService.restaurants(searchTerm)
        .pipe(catchError(error => from([])))
    )).subscribe(restaurants => this.restaurants = restaurants)
    this.restaurantsService.restaurants().subscribe(restaurants => this.restaurants = restaurants)



    //.subscribe(searchTerm => console.log(searchTerm))
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
