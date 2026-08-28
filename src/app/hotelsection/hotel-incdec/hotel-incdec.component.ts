import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-hotel-incdec',
  templateUrl: './hotel-incdec.component.html',
  styleUrls: ['./hotel-incdec.component.scss']
})
export class HotelIncdecComponent implements OnInit, OnChanges {

  @Input() public selectHotelDetails: any;

  @Input() public noOfDays: number = 0;

  @Input() public usedNights: number = 0;

  @Output() public closePopup = new EventEmitter<any>();
    
  @Output() public hotelSelected = new EventEmitter<any>();

  public nights: number = 1;

  public startDay: number = 1;

  public daysCount: any = {
    start: 1,
    end: 1
  };

  constructor( public sharedData: SharedDataService ) { }

  ngOnInit(): void {
    this.setInitialValues();
    console.log( 'Hotel details:', this.selectHotelDetails );
  }

  ngOnChanges( changes: SimpleChanges ): void {
    if ( changes['noOfDays'] || changes['usedNights'] || changes['selectHotelDetails'] ) {
      this.setInitialValues();
    }
  }

  get availableNights(): number {
    return Math.max( this.noOfDays - this.usedNights, 0 );
  }

  get remainingNights(): number {
    return Math.max( this.availableNights - this.nights, 0 );
  }

  get totalPrice(): number {
    const pricePerNight = Number( this.selectHotelDetails ?.pricing ?.pricePerNight || 0 );
    return ( this.nights * pricePerNight );
  }

  private setInitialValues(): void {
    this.startDay = this.usedNights + 1;
    if (this.availableNights > 0) {
      this.nights = 1;
    } else {
      this.nights = 0;
    }
    this.updateDays();
  }

  public increaseNights(): void {
    if ( this.nights < this.availableNights ) {
      this.nights++;
      this.updateDays();
    }
  }

  public decreaseNights(): void {
    if (this.nights > 1) {
      this.nights--;
      this.updateDays();
    }
  }

  private updateDays(): void {
    if (this.nights <= 0) {
      this.daysCount = {
        start: 0,
        end: 0
      };
      return;
    }
    this.startDay = this.usedNights + 1;
    this.daysCount = {
      start: this.startDay,
      end: this.startDay + this.nights - 1
    };
  }

  public confirmSelection(): void {
    if ( !this.selectHotelDetails || this.nights <= 0 || this.nights > this.availableNights ) {
      return;
    }
    const selection = {
      hotelName: this.selectHotelDetails.hotelName,
      roomName: this.selectHotelDetails.roomName,
      image: this.selectHotelDetails.image,
      nights: this.nights,
      pricePerNight: this.selectHotelDetails.pricing.pricePerNight,
      totalPrice: this.totalPrice,
      remainingNights: this.remainingNights,
      days: {
        start: this.daysCount.start,
        end: this.daysCount.end
      }
    };
    this.sharedData.setData( selection );
    this.hotelSelected.emit( selection );
    console.log( 'Hotel selection confirmed:', selection );
    this.closePopup.emit(false);
  }

  public closeModal(): void {
    this.closePopup.emit(false);
  }

}