import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent implements OnInit {

  public requestData: any;

  public sampleformDetails: any = {
    "fromCity": "Chennai, India",
    "fromCityId": "MAA",
    "toCity": "Delhi, India",
    "toCityId": "DEL",
    "adults": 1,
    "children": 0,
    "infants": 1,
    "daterange": "01 Sep 2026 - 08 Sep 2026",
    "startDate": "2026-09-01",
    "endDate": "2026-09-08",
    "totalDays": 6,
    "budgetMode": "custom",
    "budget": 18000,
    "breakdownForm": {
      "flight": 100,
      "amountflight": 19889,
      "hotel": 0,
      "amounthotel": 0,
      "food": 0,
      "amountfood": 0,
      "transport": 0,
      "amounttransport": 0,
      "visa": 0,
      "amountvisa": 0,
      "visitingPlaces": 0,
      "amountvisitingPlaces": 0,
      "breakdownTotal": 0
    }
  }

  public packageList: any;

  public showContent: boolean = false;

  public contentDetails: any;

  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {

    this.requestData = history.state?.formValue ? history.state.formValue : this.sampleformDetails;

    console.log('Home Page Request:', this.requestData);

    if (this.requestData) {
      this.getPackages(this.requestData);
    }
  }

  getPackages(formValue: any): void {
    console.log('requestttttttttttttt', formValue);

    this.apiService.getPackageDetails(formValue).subscribe({
      next: (response) => {
        console.log('Package Response:', response);
        if (response.success) {
          if (response?.status == 'SECTOR_NOT_FOUND' || response?.status == 'DURATION_NOT_FOUND' || response?.status == 'BUDGET_NOT_ENOUGH') {
            this.showContent = true;
            this.contentDetails = response.sentence;
          } else {
            this.showContent = false;
            this.packageList = response.data;
          }
        }
      },
      error: (error) => {
        console.error('Package API Error:', error);
      }
    });

  }

  public handleContentAction(action: string): void {
    console.log('Button action:', action);
    this.showContent = false;
    switch (action) {

      case 'GO_BACK':
        this.goToRequestForm('');
        break;

      case 'CHANGE_DURATION':
        this.goToRequestForm('duration');
        break;

      case 'CHANGE_BUDGET':
        this.goToRequestForm('budget');
        break;

      default:
        console.warn(
          'Unknown action:',
          action
        );
    }
  }

  public goToRequestForm(editField:any) {
    this.router.navigate(['/requestForm'], {
      state: {
        formValue: this.requestData,
        backto: true,
        editField: editField
      }
    });
  }

}
