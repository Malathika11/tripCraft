import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportsectionRoutingModule } from './transportsection-routing.module';
import { TransportDetailsComponent } from './transport-details/transport-details.component';
import { TransportCardComponent } from './transport-card/transport-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TransportDetailsComponent,
    TransportCardComponent
  ],
  imports: [
    CommonModule,
    TransportsectionRoutingModule,
    SharedModule
  ]
})
export class TransportsectionModule { }
