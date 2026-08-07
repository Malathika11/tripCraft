import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportDetailsComponent } from './transport-details/transport-details.component';

const routes: Routes = [
  {
    path: '',
    component: TransportDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportsectionRoutingModule { }
