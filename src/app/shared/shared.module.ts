import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { BudgetStatusComponent } from './budget-status/budget-status.component';
import { FilterComponent } from './filter/filter.component';
import { BudgetExceededComponent } from './budget-exceeded/budget-exceeded.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup.component';
import { NodatafoundComponent } from './nodatafound/nodatafound.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BudgetStatusComponent,
    FilterComponent,
    BudgetExceededComponent,
    PopupComponent,
    NodatafoundComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    BudgetStatusComponent,
    FilterComponent,
    BudgetExceededComponent,
    PopupComponent,
    NodatafoundComponent,
    LoginComponent
  ]
})
export class SharedModule { }
