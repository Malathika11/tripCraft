import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss']
})
export class PackageCardComponent implements OnInit {

  @Input() public filteredPackages:any;

  @Input() public formDetails:any;

  public loader:boolean = false;

  constructor(public apiService: ApiService, public router:Router) { }

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
        data.remaining = this.formDetails?.budget - data.price;
        data.current_progress = Math.round((data.price / this.formDetails?.budget ) * 100);
      });
      console.log(this.filteredPackages);
      this.loader = false;
    }
  }

  public viewPackage(item: any) {
    console.log(item);
    this.router.navigate(['/flight'],{
      state: {
        formValue: this.formDetails,
        cardDetails: item
      }
    }); 
  }

}
