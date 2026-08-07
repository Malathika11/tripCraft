import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsectionRoutingModule } from './requestsection-routing.module';
import { RequestFormComponent } from './request-form/request-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
// import { VisasectionModule } from '../visasection/visasection.module';


@NgModule({
  declarations: [
    RequestFormComponent
  ],
  imports: [
    CommonModule,
    RequestsectionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    // VisasectionModule
  ]
})
export class RequestsectionModule { }
