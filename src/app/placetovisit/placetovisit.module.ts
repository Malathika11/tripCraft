import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacetovisitRoutingModule } from './placetovisit-routing.module';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { VisitCardsComponent } from './visit-cards/visit-cards.component';
import { PlaceInfoComponent } from './place-info/place-info.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    VisitDetailsComponent,
    VisitCardsComponent,
    PlaceInfoComponent
  ],
  imports: [
    CommonModule,
    PlacetovisitRoutingModule,
    SharedModule
  ]
})
export class PlacetovisitModule { }
