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

  public percentage:any = {
    flight: 0,
    hotel: 0,
    visitingPlaces: 0,
    guide: 0
  };

  constructor(public apiService: ApiService, public tripState: TripStateService) { }

  ngOnInit(): void {
    this.requestFormValue =  this.tripState.get<any>('requestFormValue') || {};
    this.packageCardDetails = this.tripState.get<any>('packageCardDetails') || {}
    if (this.requestFormValue.budgetMode === 'total') {
      this.splitAmount();
    }
  }

  public splitAmount(){
    this.percentage.flight = Math.round(this.packageCardDetails.price * 0.40);
    this.percentage.hotel = Math.round(this.packageCardDetails.price * 0.35);
    this.percentage.visitingPlaces = Math.round(this.packageCardDetails.price * 0.15);
    this.percentage.guide = Math.round(this.packageCardDetails.price * 0.10);
    this.showPopup = true;
    this.popupDetails = {
      popupIcon: 'cls-19-wallet',
      header: 'Manage your package budget?',
      description: ' We’ll split your package amount across Flight, Guide, Hotel and Local Visit, weighted by typical trip costs. ',
      packageAmount: this.packageCardDetails.price,
      actions: [
        {
          label: ' No, I’ll manage on my own ',
          index: 'no'
        },
        {
          label: 'Yes, use this split',
          index: 'yes'
        }
      ],
      suggestedSplit: [
        {
          icon: 'cls-61-flight',
          name: 'Flight',
          percentage: '40%',
          amount: this.percentage.flight,
        },
        {
          icon: 'cls-22-single-person',
          name: 'Guide',
          percentage: '10%',
          amount: this.percentage.guide,
        },
        {
          icon: 'cls-51-hotel',
          name: 'Hotel',
          percentage: '35%',
          amount: this.percentage.hotel,
        },
        {
          icon: 'cls-58-location',
          name: 'Local visit',
          percentage: '15%',
          amount: this.percentage.visitingPlaces,
        }
      ]
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
    let percentageValue:any = {
      flight: 40,
      hotel: 35,
      visitingPlaces: 15,
      guide: 10
    }
    const fields = ['flight', 'guide', 'hotel', 'visitingPlaces'];
    const amountFields = ['amountflight', 'amountguide', 'amounthotel', 'amountvisitingPlaces'];
    fields.forEach((field, index) => {
      this.requestFormValue.breakdownForm[field] = percentageValue[field];
      this.requestFormValue.breakdownForm[amountFields[index]] = Number(this.percentage[field].toFixed(2));
    });
    this.requestFormValue.breakdownForm.breakdownTotal = totalBudget;
  }

  public changeTripType(type: any) {
    this.tripType = type;
    if (!this.filterValue || !this.filterValue[type]) {
      console.log(this.flightResponse.filterData,type);
      
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
