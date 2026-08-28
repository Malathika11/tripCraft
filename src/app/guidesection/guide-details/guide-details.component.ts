import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-guide-details',
  templateUrl: './guide-details.component.html',
  styleUrls: ['./guide-details.component.scss']
})
export class GuideDetailsComponent implements OnInit {

  public formValues: any;

  public flightValue: any;

  public guideResponse: any;

  public loader: boolean = true;

  public budgetStatusDetails: any = {
    budget: 0,
    limit: 0,
    pageName: 'Guide',
    routerLabel: 'guideDetails',
    routerURL: 'hotel'
  }

  public packageValue:any;

  constructor(public apiService: ApiService, public tripState: TripStateService) { }

  ngOnInit(): void {
    this.formValues = this.tripState.get<any>('requestFormValue') || {};
    this.packageValue = this.tripState.get<any>('packageCardDetails') || {};
    this.flightValue = this.tripState.get<any>('flightDeails') || {};
    console.log(this.formValues);
    this.getPackageDetails();
    this.budgetStatusDetails.budget = this.formValues.budget;
    this.budgetStatusDetails.limit = this.formValues.breakdownForm.amountguide;
  }

  public getPackageDetails() {
    const request = {
      toCityId: this.formValues.toCityId,
      totalDays: this.formValues.totalDays
    };
    this.apiService.searchGuide(request).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.success) {
          this.guideResponse = response.data;
          this.loader = false;
        }
      }
    });
  }

}
