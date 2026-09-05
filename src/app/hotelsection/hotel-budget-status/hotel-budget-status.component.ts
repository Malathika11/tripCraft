import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-hotel-budget-status',
  templateUrl: './hotel-budget-status.component.html',
  styleUrls: ['./hotel-budget-status.component.scss']
})
export class HotelBudgetStatusComponent implements OnInit {

  public selectedHotel:any = [];
  
  public usedBudget: number = 0;

  @Input() public packageDetails:any;

  public budgetDetails: any = {
    budget: 0,
    limit: 0,
    pageName: 'Hotel',
    routerLabel: 'hotelDetails',
    routerURL: 'itinerary'
  }

  public cardData:any;

  @Output() public hotelRemoved = new EventEmitter<any>();

  public budgetPercentage:any = 0;

  public exceedDetails: any;

  public submit:boolean = false;

  constructor(public sharedData: SharedDataService, public router: Router, public toast: ToastService, public tripState: TripStateService) { }

  ngOnInit(): void {
    this.cardData = this.tripState.get<any>('packageCardDetails') || {};
    console.log(this.packageDetails, this.budgetDetails, this.cardData);
    this.budgetDetails.budget = this.packageDetails.budget;
    this.budgetDetails.limit = this.packageDetails.breakdownForm.amounthotel;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.sharedData.data$.subscribe(data => {
      if (data) {
        const existingIndex = this.selectedHotel.findIndex(
          (hotel: any) => hotel.hotelName === data.hotelName && hotel.roomName === data.roomName
        );

        if (existingIndex !== -1) {
          const existing = this.selectedHotel[existingIndex];
          const updatedHotel = {
            ...existing,
            nights: existing.nights + data.nights,
            totalPrice: existing.totalPrice + data.totalPrice,
            remainingNights: data.remainingNights,   
            days: {
              start: Math.min(existing.days.start, data.days.start),
              end: Math.max(existing.days.end, data.days.end)
            }
          };
          this.selectedHotel = [
            ...this.selectedHotel.slice(0, existingIndex),
            updatedHotel,
            ...this.selectedHotel.slice(existingIndex + 1)
          ];
        } else {
          this.selectedHotel = [...this.selectedHotel, data];
        }
        this.usedBudget = this.selectedHotel.reduce(
          (total: number, hotel: any) => total + Number(hotel.totalPrice || 0),
          0
        );
        this.budgetPercentage = Math.round((this.usedBudget / this.budgetDetails.limit) * 100);
      }
    });
  }

  public get remainingBudget(): number {
    return this.budgetDetails.limit - this.usedBudget;
  }

  public continue(){
    if(this.budgetPercentage < 100){
      let nightsCount = this.selectedHotel.reduce(
        (total: number, count: any) => total + Number(count.nights || 0),
        0
      );
      console.log(nightsCount);
      if(nightsCount == this.packageDetails.totalDays ){
        this.tripState.set('hotelValue', this.selectedHotel);
        this.router.navigate([this.budgetDetails?.routerURL]);
      }else{
        this.toast.info('Please complete hotel selection for all ' + this.packageDetails.totalDays + 'nights to continue');
      }
    }else{
      this.exceedDetails = {
        budget : this.budgetDetails.limit,
        totalCost: this.usedBudget,
        exceed: this.remainingBudget,
        pageName: 'Hotel',
        budgetPara: 'This hotel exceeds your allocated hotel budget',
        impactMeg: 'Selecting this hotel will reduce your budget for other travel expenses like food, transport, and activities.'
      }
      this.submit = true;
    }
  }

  public remove(index: number, hotelValue:any) {
    this.selectedHotel.splice(index, 1);
    this.hotelRemoved.emit({index, hotelValue});
    this.usedBudget = this.selectedHotel.reduce(
      (total: number, hotel: any) => total + Number(hotel.totalPrice || 0),
      0
    );
    this.budgetPercentage = Math.round((this.usedBudget / this.budgetDetails.limit) * 100);
  }

  public closeBudgetPopup(): void {
    this.submit = false;
  }

  public selectHotelAnyway(): void {
    this.submit = false;
  }

}
