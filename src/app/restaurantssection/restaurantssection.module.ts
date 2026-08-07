import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantssectionRoutingModule } from './restaurantssection-routing.module';
import { RestaurantsDetailsComponent } from './restaurants-details/restaurants-details.component';
import { RestaurantsPlanningComponent } from './restaurants-planning/restaurants-planning.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RestaurantsDetailsComponent,
    RestaurantsPlanningComponent
  ],
  imports: [
    CommonModule,
    RestaurantssectionRoutingModule,
    SharedModule
  ]
})
export class RestaurantssectionModule { }
