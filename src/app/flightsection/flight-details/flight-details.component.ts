import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

  public formPackageDetails: any;

  public samplevalue = {
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
        "amountflight": 42857.14,
        "guide": 14.285714285714286,
        "amountguide": 42857.14,
        "hotel": 14.285714285714286,
        "amounthotel": 42857.14,
        "food": 14.285714285714286,
        "amountfood": 42857.14,
        "transport": 14.285714285714286,
        "amounttransport": 42857.14,
        "visa": 14.285714285714286,
        "amountvisa": 42857.14,
        "visitingPlaces": 14.285714285714286,
        "amountvisitingPlaces": 42857.14,
        "breakdownTotal": 300000
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
    "navigationId": 4
  }

  public cityValue: any = {
    fromCity: '',
    toCity: ''
  }

  public filterData: any;

  public budgetStatus: any;

  public flightDetailsData: any;

  public tripType: any = 'oneWay';

  public loader: boolean = true;

  public flightResponse: any;

  public selectedFlights: any = {
    oneWay: null,
    roundTrip: null
  };

  public filterValue: any;

  public filterApplyData: any;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    console.log('history flight', history.state);
    this.formPackageDetails = history.state?.requestFormValue ? history.state : this.samplevalue;
    if (this.formPackageDetails.requestFormValue.budgetMode == 'total') {
      this.splitTotalBudget();
    }
    this.getFlightDetails();
    this.cityValue.fromCity = this.formPackageDetails.requestFormValue.fromCity.split(',')[0].trim();
    this.cityValue.toCity = this.formPackageDetails.requestFormValue.toCity.split(',')[0].trim();
  }

  getFlightDetails() {
    console.log(this.formPackageDetails.requestFormValue);

    const request = {
      fromCityId: this.formPackageDetails.requestFormValue.fromCityId,
      toCityId: this.formPackageDetails.requestFormValue.toCityId,
      startDate: this.formPackageDetails.requestFormValue.startDate,
      endDate: this.formPackageDetails.requestFormValue.endDate,
      adults: this.formPackageDetails.requestFormValue.adults,
      children: this.formPackageDetails.requestFormValue.children,
      infants: this.formPackageDetails.requestFormValue.infants,
      amount: this.formPackageDetails.requestFormValue.breakdownForm['amountflight'] / 2,
      totalBudget: this.formPackageDetails.requestFormValue.budget
    };

    this.apiService.searchFlights(request).subscribe({
      next: (response: any) => {
        console.log(response);

        if (response.success) {
          this.loader = false;
          this.flightResponse = response;
          this.changeTripType('oneWay');
          this.budgetStatus.limit = this.formPackageDetails.requestFormValue.breakdownForm['amountflight'];
        }
      }
    });
  }

  public splitTotalBudget() {
    const totalBudget = Number(this.formPackageDetails.packageCardDetails.price || 0);

    if (!totalBudget) {
      return;
    }

    const fields = ['flight', 'guide', 'hotel', 'food', 'transport', 'visa', 'visitingPlaces'];
    const amountFields = ['amountflight', 'amountguide', 'amounthotel', 'amountfood', 'amounttransport', 'amountvisa', 'amountvisitingPlaces'];
    const percentage = 100 / fields.length;

    fields.forEach((field, index) => {
      const amount = (totalBudget * percentage) / 100;
      this.formPackageDetails.requestFormValue.breakdownForm[field] = percentage;
      this.formPackageDetails.requestFormValue.breakdownForm[amountFields[index]] = Number(amount.toFixed(2));
    });
    this.formPackageDetails.requestFormValue.breakdownForm.breakdownTotal = totalBudget;
  }

  public changeTripType(type: any) {
    this.tripType = type;
    if (!this.filterValue || !this.filterValue[type]) {
      this.filterData = this.flightResponse.filterData[type];
      this.budgetStatus = this.flightResponse.budgetStatus;
      this.flightDetailsData = this.flightResponse.flightDetails[type];
    } else {
      this.filterChanged(this.filterValue, 'changeTab')
    }
  }

  public selectFlightFun(event: any): void {
    this.selectedFlights = { ...this.selectedFlights, [event.type]: event?.flight || null };
  }

  public filterChanged(filters: any, type: any = ''): void {
    const tripType = this.tripType;
    const flights = this.flightResponse?.flightDetails?.[tripType] || [];
    this.filterValue = { ...this.filterValue, ...filters };
    if (type == 'changeTab') {
      this.filterApplyData = this.filterValue;
      this.filterData = this.flightResponse.filterData[tripType];
    }
    filters = filters[tripType];
    this.flightDetailsData = flights.filter((flight: any) => {
      const stopsMatch = !filters?.stops || filters.stops === 'all' || this.checkStops(flight.stopType, filters.stops);
      const departureTimeMatch = !filters?.departureTime || filters.departureTime === 'all' || this.checkDepartureTime(flight.departureTime, filters.departureTime);
      const airlineMatch = !filters?.airlines?.length || this.checkAirline(flight.name, filters.airlines);
      const priceRange = filters?.priceRange;
      const priceMatch = !priceRange ||
        (
          Number(flight.amount) >= Number(priceRange.min) &&
          Number(flight.amount) <= Number(priceRange.max)
        );
      return (stopsMatch && departureTimeMatch && airlineMatch && priceMatch);
    });
  }

  private checkStops(stopType: string, filterStop: string): boolean {

    if (filterStop === 'direct') {
      return stopType === 'Direct';
    }
    if (filterStop === '1-stop') {
      return stopType === '1 Stop';
    }
    if (filterStop === '2+-stops') {
      return stopType === '2+ Stops';
    }
    return true;
  }

  private checkAirline(airlineCode: string, selectedAirlines: string[]): boolean {

    return selectedAirlines.includes(airlineCode);
  }

  private checkDepartureTime(time: string, filterTime: string): boolean {
    const hour = Number(time.split(':')[0]);
    switch (filterTime) {
      case 'morning': return hour >= 5 && hour < 12;
      case 'afternoon': return hour >= 12 && hour < 17;
      case 'evening': return hour >= 17 && hour < 21;
      case 'night': return hour >= 21 || hour < 5;
      default: return true;
    }
  }
}
