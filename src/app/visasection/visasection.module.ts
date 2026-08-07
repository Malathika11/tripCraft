import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisasectionRoutingModule } from './visasection-routing.module';
import { VisaStatusCheckComponent } from './visa-status-check/visa-status-check.component';
import { VerifyExistingVisaComponent } from './verify-existing-visa/verify-existing-visa.component';
import { MainVisaComponent } from './main-visa/main-visa.component';


@NgModule({
  declarations: [
    VisaStatusCheckComponent,
    VerifyExistingVisaComponent,
    MainVisaComponent
  ],
  imports: [
    CommonModule,
    VisasectionRoutingModule
  ],
  exports: [
    VisaStatusCheckComponent,
    VerifyExistingVisaComponent
  ]
})
export class VisasectionModule { }
