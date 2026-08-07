import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideDetailsComponent } from './guide-details/guide-details.component';

const routes: Routes = [
  {
    path: '',
    component: GuideDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesectionRoutingModule { }
