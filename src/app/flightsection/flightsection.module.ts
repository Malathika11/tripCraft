import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightsectionRoutingModule } from './flightsection-routing.module';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { SharedModule } from '../shared/shared.module';
import { FlightFilterComponent } from './flight-filter/flight-filter.component';


@NgModule({
  declarations: [
    FlightDetailsComponent,
    FlightCardComponent,
    FlightFilterComponent
  ],
  imports: [
    CommonModule,
    FlightsectionRoutingModule,
    SharedModule
  ]
})
export class FlightsectionModule { }
