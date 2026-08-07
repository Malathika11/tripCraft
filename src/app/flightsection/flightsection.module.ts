import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightsectionRoutingModule } from './flightsection-routing.module';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FlightDetailsComponent,
    FlightCardComponent
  ],
  imports: [
    CommonModule,
    FlightsectionRoutingModule,
    SharedModule
  ]
})
export class FlightsectionModule { }
