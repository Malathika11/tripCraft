import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItineraryRoutingModule } from './itinerary-routing.module';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { CostBreakdownComponent } from './cost-breakdown/cost-breakdown.component';
import { DayItineraryComponent } from './day-itinerary/day-itinerary.component';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BudgetSummaryComponent,
    CostBreakdownComponent,
    DayItineraryComponent,
    BudgetCardComponent
  ],
  imports: [
    CommonModule,
    ItineraryRoutingModule,
    SharedModule
  ]
})
export class ItineraryModule { }
