import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightsectionRoutingModule } from './flightsection-routing.module';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { SharedModule } from '../shared/shared.module';
import { FlightFilterComponent } from './flight-filter/flight-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightBudgetStatusComponent } from './flight-budget-status/flight-budget-status.component';

@NgModule({
  declarations: [
    FlightDetailsComponent,
    FlightCardComponent,
    FlightFilterComponent,
    FlightBudgetStatusComponent
  ],
  imports: [
    CommonModule,
    FlightsectionRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FlightsectionModule { }
