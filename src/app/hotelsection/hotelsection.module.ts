import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsectionRoutingModule } from './hotelsection-routing.module';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelBodyComponent } from './hotel-body/hotel-body.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HotelDetailsComponent,
    HotelBodyComponent,
  ],
  imports: [
    CommonModule,
    HotelsectionRoutingModule,
    SharedModule
  ]
})
export class HotelsectionModule { }
