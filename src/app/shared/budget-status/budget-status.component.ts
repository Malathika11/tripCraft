import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { TripStateService } from 'src/app/services/trip-state.service';
// import { Budget } from '../../models/budget.model';
// import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-budget-status',
  templateUrl: './budget-status.component.html',
  styleUrls: ['./budget-status.component.scss']
})
export class BudgetStatusComponent implements OnInit {

  public selectedGuide: any = null;
  
  public usedBudget: number = 0;

  @Input() public budgetDetails:any;

  @Input() public cardData:any;

  public selectedValues:any;

  public budgetPercentage:any = 0;

  constructor(public sharedData: SharedDataService, public router: Router, public tripState:TripStateService) { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.sharedData.data$.subscribe(data => {
      console.log('datadatadatadata', data);
      
      if (data && data?.selectHoleValue != '') {
        console.log(data);
        this.selectedGuide = data?.selectHoleValue;
        this.selectedValues = data.selectDetails;
        this.usedBudget = this.selectedGuide.perDayPrice * this.selectedValues.tripDays;
        console.log(this.usedBudget, this.budgetDetails.limit, this.budgetPercentage);
        console.log(this.usedBudget / this.budgetDetails.limit ,(this.usedBudget / this.budgetDetails.limit ) * 100);
        
        this.budgetPercentage = Math.round((this.usedBudget / this.budgetDetails.limit ) * 100);   
      }

      if(data?.selectHoleValue == ''){
        this.selectedGuide = '';
        this.usedBudget = 0;
        this.budgetPercentage = 0;
      }
    });
  }

  public get remainingBudget(): number {
    return this.budgetDetails.limit - this.usedBudget;
  }

  public continue(){
    this.tripState.set(this.budgetDetails?.routerLabel, this.selectedValues);
    this.router.navigate([this.budgetDetails?.routerURL]);
  }

}