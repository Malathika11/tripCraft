import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-package-filter',
  templateUrl: './package-filter.component.html',
  styleUrls: ['./package-filter.component.scss']
})
export class PackageFilterComponent implements OnInit {

  // public categories:any = [
  //   {
  //     txt: 'All Packages',
  //     icon: ''
  //   },
  //   {
  //     txt: 'Family',
  //     icon: ''
  //   },
  //   {
  //     txt: 'Couple',
  //     icon: ''
  //   },
  //   {
  //     txt: 'Adventure',
  //     icon: 'cls-54-ecg-heart'
  //   },
  //   {
  //     txt: 'Luxury',
  //     icon: 'cls-31-crown'
  //   },
  //   {
  //     txt: 'Budget Friendly',
  //     icon: 'cls-19-wallet'
  //   }
  // ];

  public selectedCategory = 'All Packages';

  public selectedSort = '';

  @Input() public filteredPackages:any;

  constructor() { }

  ngOnInit(){
  }

  // public selectCategory(category:string){
  //   this.selectedCategory = category;
  //   if(category === 'All Packages'){
  //     this.filteredPackages = [...this.packages];
  //     return;
  //   }
  //   this.filteredPackages = this.packages.filter(x=>{
  //     return x.category === category;
  //   });
  // }

  public sortPackages(){
    switch(this.selectedSort){
      case 'low':
        this.filteredPackages.sort((a:any,b:any)=>a.price-b.price);
      break;
      case 'high':
        this.filteredPackages.sort((a:any,b:any)=>b.price-a.price);
      break;
      case 'rating':
        this.filteredPackages.sort((a:any,b:any)=>b.rating-a.rating);
      break;
      default:
        this.filteredPackages.sort((a:any,b:any)=>b.popularity-a.popularity);
      break;
    }
  }

}
