import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss']
})
export class PackageCardComponent implements OnInit {

  @Input() public filteredPackages:any;

  @Input() public totalBudget:any;

  public loader:boolean = false;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.loader = true;
    setTimeout(() => {
      this.budgetUtilization('ngon');
    }, 2000);
  }

  public budgetUtilization(type:any){
    console.log(this.filteredPackages,type,'estttttttttttttttttt');
    if(this.filteredPackages){
      this.filteredPackages.map((data:any) => {
        data.remaining = this.totalBudget - data.price;
        data.current_progress = Math.round((data.price / this.totalBudget ) * 100);
      });
      console.log(this.filteredPackages);
      this.loader = false;
    }
  }

  public viewPackage(item: any) {
    console.log(item);
    // later

    // this.router.navigate(['/package-details'],{
    //    state:item
    // });
  }

}
