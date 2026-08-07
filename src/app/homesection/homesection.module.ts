import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomesectionRoutingModule } from './homesection-routing.module';
import { HomeDetailsComponent } from './home-details/home-details.component';


@NgModule({
  declarations: [
    HomeDetailsComponent
  ],
  imports: [
    CommonModule,
    HomesectionRoutingModule
  ]
})
export class HomesectionModule { }
