import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { TripStateService } from 'src/app/services/trip-state.service';

interface AvailableGap {
  start: number;
  end: number;
  length: number;
}

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
  public selectedHotels: any[] = [];

  // ✅ NEW — gap tracking
  public availableGaps: AvailableGap[] = [];
  public selectedGap: AvailableGap | null = null;
  public showGapSelector = false;

  public noDataMessage = "We couldn't find any hotel matching your search.";

  constructor(public toast: ToastService, public tripState: TripStateService) { }

  ngOnInit(): void {
  }

  // ✅ NEW — ella booked days-ஐயும் collect pannும்
  private getOccupiedDays(): Set<number> {
    const occupied = new Set<number>();
    this.selectedHotels.forEach(hotel => {
      for (let d = hotel.days.start; d <= hotel.days.end; d++) {
        occupied.add(d);
      }
    });
    return occupied;
  }

  // ✅ NEW — ella free gaps-ஐயும் kandுpudiкும் (oru gap illa, multiple-um kидைкும்)
  private findAllAvailableGaps(): AvailableGap[] {
    const occupied = this.getOccupiedDays();
    const gaps: AvailableGap[] = [];
    let gapStart: number | null = null;

    for (let day = 1; day <= this.nightCount; day++) {
      if (!occupied.has(day)) {
        if (gapStart === null) {
          gapStart = day;
        }
      } else {
        if (gapStart !== null) {
          gaps.push({ start: gapStart, end: day - 1, length: day - gapStart });
          gapStart = null;
        }
      }
    }

    if (gapStart !== null) {
      gaps.push({ start: gapStart, end: this.nightCount, length: this.nightCount - gapStart + 1 });
    }

    return gaps;
  }

  public selectHotel(hotel: any): void {
    let requestForm = this.tripState.get<any>('requestFormValue') || {};
    this.nightCount = requestForm.totalDays;

    this.availableGaps = this.findAllAvailableGaps();

    if (!this.availableGaps.length) {
      this.toast.info('All package nights are already selected.');
      return;
    }

    this.selectedHotel = hotel;

    if (this.availableGaps.length === 1) {
      // ✅ oru gap mattum irундha, direct-ah nights popup ku pogum
      this.selectedGap = this.availableGaps[0];
      this.showPopup = true;
    } else {
      // ✅ multiple gaps — user muthalla enna gap-ku vேண்டும் nu choose pandанум
      this.showGapSelector = true;
    }
  }

  public chooseGap(gap: AvailableGap): void {
    this.selectedGap = gap;
    this.showGapSelector = false;
    this.showPopup = true;
  }

  public trackByHotel(index: number, hotel: any): string {
    return hotel.hotelName + '-' + index;
  }

  public closePopupFun(event: any) {
    this.showPopup = event;
  }

  public hotelSelectedFun(selection: any): void {
    this.selectedHotels.push(selection);
    this.showPopup = false;
  }

  get remainingNights(): number {
    return Math.max(this.nightCount - this.getOccupiedDays().size, 0);
  }

  previousImage(hotel: any): void {
    if (!hotel.images || hotel.images.length <= 1) {
      return;
    }
    if (hotel.activeImageIndex === undefined) {
      hotel.activeImageIndex = 0;
    }
    hotel.activeImageIndex = hotel.activeImageIndex === 0 ? hotel.images.length - 1 : hotel.activeImageIndex - 1;
  }

  nextImage(hotel: any): void {
    if (!hotel.images || hotel.images.length <= 1) {
      return;
    }
    if (hotel.activeImageIndex === undefined) {
      hotel.activeImageIndex = 0;
    }
    hotel.activeImageIndex = hotel.activeImageIndex === hotel.images.length - 1 ? 0 : hotel.activeImageIndex + 1;
  }

  changeImage(hotel: any, index: number): void {
    hotel.activeImageIndex = index;
  }

}