import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-request',
  templateUrl: './package-request.component.html',
  styleUrls: ['./package-request.component.scss']
})
export class PackageRequestComponent implements OnInit {

  public sampleformDetails: any = {
    "fromCity": "Chennai, India",
    "fromCityId": "MAA",
    "toCity": "Delhi, India",
    "toCityId": "DEL",
    "adults": 1,
    "children": 0,
    "infants": 1,
    "daterange": "01 Sep 2026 - 18 Sep 2026",
    "startDate": "2026-09-01",
    "endDate": "2026-09-18",
    "totalDays": 18,
    "budgetMode": "custom",
    "budget": 19889,
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
  public formDetails:any;

  public datesAndNights: any;

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log(history.state);
    this.formDetails = history.state?.formValue ? history.state.formValue : this.sampleformDetails;
    const startDate = new Date(this.formDetails.startDate); 
    const endDate = new Date(this.formDetails.endDate);

    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays  = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.datesAndNights =  diffDays + ' Days / ' +  (diffDays - 1) + ' Nights';
  }

  public goToRequestForm(){
    this.router.navigate(['/requestForm'],{
      state: {
        formValue: this.formDetails,
        backto: true
      }
    }); 
  }
}
