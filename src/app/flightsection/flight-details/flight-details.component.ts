import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

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

  public showPopup:boolean = false;

  public popupDetails:any;

  public requestFormValue:any;

  public packageCardDetails:any;

  constructor(public apiService: ApiService, public tripState: TripStateService) { }

  ngOnInit(): void {
    this.requestFormValue =  this.tripState.get<any>('requestFormValue') || {};
    this.packageCardDetails = this.tripState.get<any>('packageCardDetails') || {}
    if (this.requestFormValue.budgetMode === 'total') {
      this.showPopup = true;
      this.popupDetails = {
        popupIcon: 'cls-19-wallet',
        header: 'Would you like us to manage your package budget?',
        description: ' We’ll equally split your selected package amount across Flight, Guide, Hotel and Local Visit. ',
        packageAmount: this.packageCardDetails.price,
        actions: [
          {
            label: ' No, I’ll manage on my own ',
            index: 'no'
          },
          {
            label: 'Yes, manage my budget',
            index: 'yes'
          }
        ]
      }
    }
  }

  getFlightDetails() {
    console.log(this.requestFormValue);

    const request = {
      fromCityId: this.requestFormValue.fromCityId,
      toCityId: this.requestFormValue.toCityId,
      startDate: this.requestFormValue.startDate,
      endDate: this.requestFormValue.endDate,
      adults: this.requestFormValue.adults,
      children: this.requestFormValue.children,
      infants: this.requestFormValue.infants,
      amount: this.requestFormValue.breakdownForm['amountflight'] / 2 || 0,
      totalBudget: this.packageCardDetails.price
    };

    this.apiService.searchFlights(request).subscribe({
      next: (response: any) => {
        console.log(response);

        if (response.success) {
          this.loader = false;
          this.flightResponse = response;
          this.changeTripType('oneWay');
          this.budgetStatus.limit = this.requestFormValue.breakdownForm['amountflight'];
        }
      }
    });
  }

  public splitTotalBudget() {
    console.log('splittttttttttttttttt');
    
    const totalBudget = Number(this.packageCardDetails.price || 0);

    if (!totalBudget) {
      return;
    }

    const fields = ['flight', 'guide', 'hotel', 'food', 'transport', 'visa', 'visitingPlaces'];
    const amountFields = ['amountflight', 'amountguide', 'amounthotel', 'amountfood', 'amounttransport', 'amountvisa', 'amountvisitingPlaces'];
    const percentage = 100 / fields.length;

    fields.forEach((field, index) => {
      const amount = (totalBudget * percentage) / 100;
      this.requestFormValue.breakdownForm[field] = percentage;
      this.requestFormValue.breakdownForm[amountFields[index]] = Number(amount.toFixed(2));
    });
    this.requestFormValue.breakdownForm.breakdownTotal = totalBudget;
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

  public emitPopupDetailsFun(event:any){
    this.showPopup = false;
    console.log(event);
    
    if (event === 'yes') {
      this.splitTotalBudget();
    }
    this.getFlightDetails();
    this.cityValue.fromCity = this.requestFormValue.fromCity .split(',')[0] .trim();
    this.cityValue.toCity = this.requestFormValue.toCity .split(',')[0] .trim();
  }
}
