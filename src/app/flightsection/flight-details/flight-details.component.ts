import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

  public formPackageDetails: any;

  public samplevalue = {
    "formValue": {
      "fromCity": "Chennai, India",
      "fromCityId": "MAA",
      "toCity": "Zurich, Switzerland",
      "toCityId": "ZRH",
      "adults": 1,
      "children": 0,
      "infants": 0,
      "daterange": "10 Sep 2026 - 16 Sep 2026",
      "startDate": "2026-09-10",
      "endDate": "2026-09-16",
      "totalDays": 7,
      "budgetMode": "total",
      "budget": 100000,
      "breakdownForm": {
        "flight": 0,
        "amountflight": 0,
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
    },
    "cardDetails": {
      "packageId": 9,
      "sector": "ZRH",
      "from_city_id": "ALL",
      "from_city": "All Cities",
      "to_city_id": "ZRH",
      "to_city": "Zurich, Switzerland",
      "package_name": "Zurich Explorer",
      "packageDetailId": 30,
      "title": "Zurich Explorer",
      "badge": "Most Popular",
      "image": "https://res.cloudinary.com/zvebiyom/image/upload/v1786617437/Zurich_3.jpg",
      "days": "7 Days / 6 Nights",
      "duration_days": 7,
      "rating": "4.8",
      "rating_color": "green",
      "reviews": 321,
      "description": "Explore Zurich, Switzerland with comfortable accommodation, sightseeing, food and local transportation.",
      "used": 78,
      "current_progress": 76,
      "price": "76000.00",
      "remaining": 24000,
      "total_budget": "83600.00",
      "popularity": 99,
      "amount_label": "₹",
      "includes": [
        {
          "id": 157,
          "package_detail_id": 30,
          "icon": "cls-71-transport",
          "name": "Transport"
        },
        {
          "id": 158,
          "package_detail_id": 30,
          "icon": "cls-60-food",
          "name": "Food"
        },
        {
          "id": 159,
          "package_detail_id": 30,
          "icon": "cls-51-hotel",
          "name": "Hotel"
        },
        {
          "id": 160,
          "package_detail_id": 30,
          "icon": "cls-61-flight",
          "name": "Flight"
        }
      ]
    },
  }
  
  public cityValue : any = {
    fromCity: '',
    toCity: ''
  }

  public tripType: any = 'oneWay';

  constructor() { }

  ngOnInit(): void {
    this.formPackageDetails = history.state?.formValue ? history.state : this.samplevalue;
    console.log('this.formPackageDetails', this.formPackageDetails);
    this.cityValue.fromCity = this.formPackageDetails.formValue.fromCity.split(',')[0].trim();
    this.cityValue.toCity = this.formPackageDetails.formValue.toCity.split(',')[0].trim();
    if (this.formPackageDetails.formValue.budgetMode == 'total') {
      this.splitTotalBudget();
    }
  }

  public splitTotalBudget() {
    const totalBudget = Number(this.formPackageDetails.formValue.budget || 0);

    if (!totalBudget) {
      return;
    }

    const fields = ['flight', 'hotel', 'food', 'transport', 'visa', 'visitingPlaces'];
    const amountFields = ['amountflight', 'amounthotel', 'amountfood', 'amounttransport', 'amountvisa', 'amountvisitingPlaces'];
    const percentage = 100 / fields.length;

    fields.forEach((field, index) => {
      const amount = (totalBudget * percentage) / 100;
      this.formPackageDetails.formValue.breakdownForm[field] = percentage;
      this.formPackageDetails.formValue.breakdownForm[amountFields[index]] = Number(amount.toFixed(2));
    });

    this.formPackageDetails.formValue.breakdownForm.breakdownTotal = totalBudget;
  }

  public changeTripType(type: any) {
    this.tripType = type;
  }

}
