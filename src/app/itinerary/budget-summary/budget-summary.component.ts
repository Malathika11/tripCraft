import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { TripStateService } from 'src/app/services/trip-state.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrls: ['./budget-summary.component.scss']
})
export class BudgetSummaryComponent implements OnInit {

  public loader:boolean = true;

  constructor(public tripState: TripStateService, public commonService: CommonService) { }

  ngOnInit(): void {
    this.loader = true;
    this.commonService.loadFromSession();
    this.loader = false;
  }

  public continueBooking(): void {

    console.log('Continue to booking');

  }

  public saveTrip(): void {

    console.log('Save trip plan');

  }


}
