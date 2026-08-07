import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homesection/homesection.module').then(m => m.HomesectionModule)
  },
  {
    path: 'requestForm',
    loadChildren:() => import('./requestsection/requestsection.module').then(m => m.RequestsectionModule)
  },
  {
    path: 'package',
    loadChildren:() => import('./packagesection/packagesection.module').then(m => m.PackagesectionModule)
  },
  {
    path: 'flight',
    loadChildren: () => import('./flightsection/flightsection.module').then(m => m.FlightsectionModule)
  },
  {
    path: 'guide',
    loadChildren: () => import('./guidesection/guidesection.module').then(m => m.GuidesectionModule)
  },
  {
    path: 'transport',
    loadChildren: () => import('./transportsection/transportsection.module').then(m => m.TransportsectionModule)
  },
  {
    path: 'hotel',
    loadChildren: () => import('./hotelsection/hotelsection.module').then(m => m.HotelsectionModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./restaurantssection/restaurantssection.module').then(m => m.RestaurantssectionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
