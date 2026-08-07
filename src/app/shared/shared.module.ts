import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { BudgetStatusComponent } from './budget-status/budget-status.component';
import { FilterComponent } from './filter/filter.component';
import { BudgetExceededComponent } from './budget-exceeded/budget-exceeded.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BudgetStatusComponent,
    FilterComponent,
    BudgetExceededComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    HeaderComponent,
    BudgetStatusComponent,
    FilterComponent,
    BudgetExceededComponent
  ]
})
export class SharedModule { }
