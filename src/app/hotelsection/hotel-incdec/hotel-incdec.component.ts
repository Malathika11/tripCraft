import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

interface Gap {
  start: number;
  end: number;
  length: number;
}

@Component({
  selector: 'app-hotel-incdec',
  templateUrl: './hotel-incdec.component.html',
  styleUrls: ['./hotel-incdec.component.scss']
})
export class HotelIncdecComponent implements OnInit, OnChanges {

  @Input() public selectHotelDetails: any;

  // ✅ FIX — null allow pannуங்க
  @Input() public selectedGap: Gap | null = null;

  @Output() public closePopup = new EventEmitter<any>();
  @Output() public hotelSelected = new EventEmitter<any>();

  public nights: number = 1;
  public daysCount: any = { start: 1, end: 1 };

  constructor(public sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedGap'] || changes['selectHotelDetails']) {
      this.setInitialValues();
    }
  }

  get availableNights(): number {
    return this.selectedGap ? this.selectedGap.length : 0;
  }

  get remainingNights(): number {
    return Math.max(this.availableNights - this.nights, 0);
  }

  get totalPrice(): number {
    const pricePerNight = Number(this.selectHotelDetails?.pricing?.pricePerNight || 0);
    return this.nights * pricePerNight;
  }

  private setInitialValues(): void {
    this.nights = this.availableNights > 0 ? 1 : 0;
    this.updateDays();
  }

  public increaseNights(): void {
    if (this.nights < this.availableNights) {
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
    // ✅ selectedGap null check already irукка (safe)
    if (this.nights <= 0 || !this.selectedGap) {
      this.daysCount = { start: 0, end: 0 };
      return;
    }
    this.daysCount = {
      start: this.selectedGap.start,
      end: this.selectedGap.start + this.nights - 1
    };
  }

  public confirmSelection(): void {
    if (!this.selectHotelDetails || !this.selectedGap || this.nights <= 0 || this.nights > this.availableNights) {
      return;
    }
    const selection = {
      hotelName: this.selectHotelDetails.hotelName,
      roomName: this.selectHotelDetails.roomName,
      image: this.selectHotelDetails.images[0],
      nights: this.nights,
      pricePerNight: this.selectHotelDetails.pricing.pricePerNight,
      totalPrice: this.totalPrice,
      days: {
        start: this.daysCount.start,
        end: this.daysCount.end
      }
    };
    this.sharedData.setData('Hotel', selection);
    this.hotelSelected.emit(selection);
    this.closePopup.emit(false);
  }

  public closeModal(): void {
    this.closePopup.emit(false);
  }

}