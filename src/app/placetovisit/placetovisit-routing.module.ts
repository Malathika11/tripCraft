import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitDetailsComponent } from './visit-details/visit-details.component';

const routes: Routes = [
  {
    path: '',
    component: VisitDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacetovisitRoutingModule { }
