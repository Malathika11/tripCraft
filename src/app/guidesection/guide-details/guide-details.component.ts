import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-guide-details',
  templateUrl: './guide-details.component.html',
  styleUrls: ['./guide-details.component.scss']
})
export class GuideDetailsComponent implements OnInit {

  public sampleData = {
    "requestFormValue": {
      "fromCity": "Chennai, India",
      "fromCityId": "MAA",
      "toCity": "Paris, France",
      "toCityId": "PAR",
      "adults": 1,
      "children": 0,
      "infants": 0,
      "daterange": "15 Sep 2026 - 20 Sep 2026",
      "startDate": "2026-09-15",
      "endDate": "2026-09-20",
      "totalDays": 6,
      "budgetMode": "total",
      "budget": 300000,
      "breakdownForm": {
        "flight": 14.285714285714286,
        "amountflight": 37428.57,
        "guide": 14.285714285714286,
        "amountguide": 37428.57,
        "hotel": 14.285714285714286,
        "amounthotel": 37428.57,
        "food": 14.285714285714286,
        "amountfood": 37428.57,
        "transport": 14.285714285714286,
        "amounttransport": 37428.57,
        "visa": 14.285714285714286,
        "amountvisa": 37428.57,
        "visitingPlaces": 14.285714285714286,
        "amountvisitingPlaces": 37428.57,
        "breakdownTotal": 262000
      }
    },
    "packageCardDetails": {
      "packageId": 1,
      "sector": "PAR",
      "from_city_id": "NULL",
      "from_city": "NULL",
      "to_city_id": "PAR",
      "to_city": "Paris, France",
      "package_name": "Paris Explorer",
      "packageDetailId": 2,
      "title": "Paris Classic",
      "badge": "Popular",
      "image": "https://res.cloudinary.com/zvebiyom/image/upload/v1786607077/2.webp",
      "days": "6 Days / 5 Nights",
      "duration_days": 6,
      "rating": "4.6",
      "rating_color": "green",
      "reviews": 286,
      "description": "Explore iconic Paris attractions including the Eiffel Tower, Louvre Museum and beautiful city streets.",
      "used": 70,
      "current_progress": 87,
      "price": "262000.00",
      "remaining": 38000,
      "total_budget": "70000.00",
      "popularity": 91,
      "amount_label": "₹",
      "includes": [
        {
          "id": 45,
          "package_detail_id": 2,
          "icon": "cls-61-flight",
          "name": "Flight"
        },
        {
          "id": 46,
          "package_detail_id": 2,
          "icon": "cls-51-hotel",
          "name": "Hotel"
        },
        {
          "id": 47,
          "package_detail_id": 2,
          "icon": "cls-60-food",
          "name": "Food"
        },
        {
          "id": 48,
          "package_detail_id": 2,
          "icon": "cls-71-transport",
          "name": "Transport"
        }
      ]
    },
    "flightDeails": {
      "oneWay": {
        "id": 131,
        "icon": "emirates.jpg",
        "name": "ek",
        "subName": "EK501 · Boeing 777",
        "amountType": "₹",
        "amount": 18500,
        "arrivelTime": "17:00",
        "arrivelSector": "PAR",
        "arrivelPlace": "Paris, France Airport",
        "stopCount": "13h 30m",
        "stopType": "Direct",
        "color": "green",
        "departureTime": "06:30",
        "departureSector": "MAA",
        "departurePlace": "Chennai, India Airport",
        "stopName": "",
        "selected": true
      },
      "roundTrip": {
        "id": 183,
        "icon": "indigo.jpg",
        "name": "6e",
        "subName": "6E601 · Airbus A321",
        "amountType": "₹",
        "amount": 17500,
        "arrivelTime": "00:30",
        "arrivelSector": "MAA",
        "arrivelPlace": "Chennai, India Airport",
        "stopCount": "14h",
        "stopType": "1 Stop",
        "color": "red",
        "departureTime": "11:30",
        "departureSector": "PAR",
        "departurePlace": "Paris, France Airport",
        "stopName": "Stop in Mumbai (BOM) for 1h 30m",
        "selected": true
      }
    },
    "navigationId": 2
  }

  public formValues: any;

  public flightValue: any;

  public guideResponse: any;

  public loader: boolean = true;

  public budgetStatusDetails: any = {
    budget: 0,
    limit: 0,
    pageName: 'Guide'
  }

  public packageValue:any;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    console.log('history guide', history.state);
    this.formValues = history.state?.requestFormValue ? history.state?.requestFormValue : this.sampleData?.requestFormValue;
    this.packageValue = history.state?.packageCardDetails ? history.state?.packageCardDetails : this.sampleData?.packageCardDetails;
    this.flightValue = history.state?.flightDeails ? history.state?.flightDeails : this.sampleData?.flightDeails;
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
