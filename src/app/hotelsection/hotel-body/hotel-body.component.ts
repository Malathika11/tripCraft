import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-hotel-body',
  templateUrl: './hotel-body.component.html',
  styleUrls: ['./hotel-body.component.scss']
})
export class HotelBodyComponent implements OnInit {

  @Input() public hotelDetails: any;

  public nightCount: any;

  public selectedHotel: any;
  
  public showPopup = false;

  public usedNights: number = 0;

  public selectedHotels: any[] = [];

  constructor(public toast: ToastService, public tripState: TripStateService) { }

  ngOnInit(): void {
  }

  public selectHotel(hotel: any): void {
    let requestForm =  this.tripState.get<any>('requestFormValue') || {};
    this.nightCount = requestForm.totalDays;
    if (this.usedNights >= this.nightCount) {
      this.toast.info('All package nights are already selected.');
      return;
    }
    this.selectedHotel = hotel;
    this.showPopup = true;
  }

  public trackByHotel(index: number, hotel: any): string {
    return hotel.hotelName + '-' + index;
  }

  public closePopupFun(event:any) {
    this.showPopup = event;
  }

  public hotelSelectedFun(selection: any): void {
    console.log( 'Hotel selected from incdec:', selection );
    this.selectedHotels.push(selection);
    this.usedNights += Number( selection.nights || 0 );
    console.log( 'Used nights:', this.usedNights );
    console.log( 'Remaining nights:', this.remainingNights );
    this.showPopup = false;
  }

  get remainingNights(): number {
    return Math.max( this.nightCount - this.usedNights, 0 );
  }

}
