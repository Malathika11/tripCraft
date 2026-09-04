import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItineraryRoutingModule { }
