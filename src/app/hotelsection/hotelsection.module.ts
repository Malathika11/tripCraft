import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsectionRoutingModule } from './hotelsection-routing.module';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelBodyComponent } from './hotel-body/hotel-body.component';
import { SharedModule } from '../shared/shared.module';
import { HotelIncdecComponent } from './hotel-incdec/hotel-incdec.component';
import { HotelBudgetStatusComponent } from './hotel-budget-status/hotel-budget-status.component';


@NgModule({
  declarations: [
    HotelDetailsComponent,
    HotelBodyComponent,
    HotelIncdecComponent,
    HotelBudgetStatusComponent,
  ],
  imports: [
    CommonModule,
    HotelsectionRoutingModule,
    SharedModule
  ]
})
export class HotelsectionModule { }
