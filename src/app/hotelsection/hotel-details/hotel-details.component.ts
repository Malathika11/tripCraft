import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HotelBodyComponent } from '../hotel-body/hotel-body.component';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  @ViewChild(HotelBodyComponent) hotelBody!: HotelBodyComponent;

  public hotelValues: any;

  public filterData: any;

  public filterHotelValues:any;

  public requestFormValue:any;

  public loader: boolean = true;

  public noDataMessage: string = '';

  public filterBudgetRemove:boolean = true;

  constructor(public apiService: ApiService, public tripState: TripStateService) { }

  ngOnInit(): void {
    this.requestFormValue =  this.tripState.get<any>('requestFormValue') || {};
    this.getHotelDetails();
  }

  public getHotelDetails() {
    const request = {
      city: this.requestFormValue.toCity.split(',')[0].trim(),
      tripDays: this.requestFormValue.totalDays
    };
    this.apiService.searchHotel(request).subscribe({
      next: (response: any) => {
        console.log(response);
        this.hotelValues = response.data.hotelValues;
        this.filterData = response.data.filterData;
        this.loader = false;
        this.filterHotelValues = this.hotelValues;
        this.noDataMessage = response.message || '';
      },
      error: (error: any) => {
        console.log('API ERROR:', error);
        this.loader = false;
        this.filterBudgetRemove = false;
        this.filterData = [];
        this.noDataMessage = error.error?.message || 'No transport packages available for the selected sector.';
      }
    });
  }

  public filterChanged(filters: any): void {
    const f = filters.filter;

    this.filterHotelValues = this.hotelValues.filter((hotel: any) => {

      const starRatingMatch = !f.starRating || f.starRating === 'all' || hotel.star === Number(f.starRating);

      let guestRatingMatch = true;
      if (f.guestRating && f.guestRating !== 'all') {
        const minRating = Number(f.guestRating);
        guestRatingMatch = hotel.rating.score >= minRating;
      }

      let distanceMatch = true;
      if (f.distance && f.distance !== 'any') {
        const maxDistance = Number(f.distance);
        distanceMatch = hotel.distanceFromCenter.value <= maxDistance;
      }

      let amenitiesMatch = true;
      if (f.amenities?.length) {
        const hotelAmenityIds = hotel.amenities.map((amenity: any) => amenity.id);
        amenitiesMatch = f.amenities.every((selectedAmenity: string) =>
          hotelAmenityIds.includes(selectedAmenity)
        );
      }

      let priceMatch = true;
      if (f.priceRange) {
        const price = Number(hotel.pricing.totalPrice);   // ✅ fixed
        const minPrice = Number(f.priceRange.min);
        const maxPrice = Number(f.priceRange.max);
        priceMatch = price >= minPrice && price <= maxPrice;
      }

      return (
        starRatingMatch &&
        guestRatingMatch &&
        distanceMatch &&
        amenitiesMatch &&
        priceMatch
      );
    });
  }

  public hotelRemovedFun(event: any) {
    // ✅ index-ku badhila, actual hotel object match pannitu remove pannуறோம்
    // (merge logic-la irундhு array length mismatch aagi index misalign aaguм் sadhyатை iruккаthинала)
    this.hotelBody.selectedHotels = this.hotelBody.selectedHotels.filter(
      (h: any) => !(
        h.hotelName === event.hotelValue.hotelName &&
        h.days.start === event.hotelValue.days.start &&
        h.days.end === event.hotelValue.days.end
      )
    );
  }

}
