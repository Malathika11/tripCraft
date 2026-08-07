import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidesectionRoutingModule } from './guidesection-routing.module';
import { GuideDetailsComponent } from './guide-details/guide-details.component';
import { GuideCardComponent } from './guide-card/guide-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GuideDetailsComponent,
    GuideCardComponent
  ],
  imports: [
    CommonModule,
    GuidesectionRoutingModule,
    SharedModule
  ]
})
export class GuidesectionModule { }
