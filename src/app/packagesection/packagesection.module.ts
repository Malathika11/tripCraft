import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesectionRoutingModule } from './packagesection-routing.module';
import { PackageRequestComponent } from './package-request/package-request.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { SharedModule } from '../shared/shared.module';
import { PackageFilterComponent } from './package-filter/package-filter.component';
import { PackageCardComponent } from './package-card/package-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PackageRequestComponent,
    PackageDetailsComponent,
    PackageFilterComponent,
    PackageCardComponent
  ],
  imports: [
    CommonModule,
    PackagesectionRoutingModule,
    SharedModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class PackagesectionModule { }
