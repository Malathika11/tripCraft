import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-flight-budget-status',
  templateUrl: './flight-budget-status.component.html',
  styleUrls: ['./flight-budget-status.component.scss']
})
export class FlightBudgetStatusComponent implements OnChanges {

  @Input() public selectedValues: any;

  public progress:any = 0;

  @Input() public budgetValue:any;

  public packageDetails:any ={
    requestFormValue: {},
    packageCardDetails: {}
  }

  public loader: boolean = true;

  constructor( public router: Router, public tripState: TripStateService){ }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.packageDetails.requestFormValue =  this.tripState.get<any>('requestFormValue') || {};
    this.packageDetails.packageCardDetails = this.tripState.get<any>('packageCardDetails') || {}
    console.log(changes);
    
    if (changes['selectedValues'] && this.budgetValue?.pageName == "Flights" ) {
      const limitBudget = Number(this.budgetValue?.limit || 0);
      const outBoundAmount = Number( this.selectedValues?.oneWay?.amount || 0 );
      const returnAmount = Number( this.selectedValues?.roundTrip?.amount || 0 );
      this.budgetValue.usedAmount = outBoundAmount + returnAmount;
      console.log(limitBudget, this.budgetValue.usedAmount);
      
      this.budgetValue.remainingAmount = limitBudget - this.budgetValue.usedAmount;
      this.progress = Math.round((this.budgetValue.usedAmount / this.budgetValue?.limit ) * 100);   
      
      this.updateBudget();
    }
    if (changes['budgetValue']) {
      this.updateBudget();
    }
  }
  
  private updateBudget(): void {
    if (!this.selectedValues) {
      this.loader = false;
      return;
    }
    this.loader = false;
  }

  public continue(){
    console.log(this.selectedValues);
    if(this.selectedValues.oneWay != null && this.selectedValues.roundTrip != null){
      this.tripState.set('flightDeails', this.selectedValues);
      this.router.navigate(['/guide']);
    }

  }

}
