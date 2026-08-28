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

  public hotelValues: any = [
    {
      hotelName: 'Atlantis The Palm',
      roomName: 'Ocean King Room',
      location: 'Palm Jumeirah',
      city: 'Dubai',
      country: 'United Arab Emirates',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      discount: 10,
      distanceFromCenter: {
        value: 5.8,
        unit: 'km'
      },
      rating: {
        score: 4.8,
        reviewCount: 4321
      },
      description: 'Majestic ocean-themed resort with Aquaventure waterpark, Lost Chambers Aquarium, and 23 restaurants.',
      amenities: [
        {
          name: 'Free WiFi',
          icon: 'wifi',
        },
        {
          name: 'Swimming Pool',
          icon: 'pool'
        },
        {
          name: 'Spa',
          icon: 'spa'
        }
      ],
      pricing: {
        currency: 'INR',
        currencySymbol: '₹',
        pricePerNight: 9500
      }
    },
    {
      hotelName: 'Burj Al Arab',
      roomName: 'Deluxe Ocean Room',
      location: 'Jumeirah Beach',
      city: 'Dubai',
      country: 'United Arab Emirates',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090',
      discount: 0,
      distanceFromCenter: {
        value: 7.2,
        unit: 'km'
      },
      rating: {
        score: 4.7,
        reviewCount: 3280
      },
      description: 'Luxury beachfront hotel with panoramic ocean views, private beach and premium dining experiences.',
      amenities: [
        {
          name: 'Free WiFi',
          icon: 'wifi',
        },
        {
          name: 'Swimming Pool',
          icon: 'pool'
        },
        {
          name: 'Spa',
          icon: 'spa'
        }
      ],
      pricing: {
        currency: 'INR',
        currencySymbol: '₹',
        pricePerNight: 12500,
      }
    },
    {
      hotelName: 'JW Marriott Marquis',
      roomName: 'Deluxe King Room',
      location: 'Business Bay',
      city: 'Dubai',
      country: 'United Arab Emirates',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      discount: 5,
      distanceFromCenter: {
        value: 3.4,
        unit: 'km'
      },
      rating: {
        score: 4.6,
        reviewCount: 2145
      },
      description: 'Modern luxury hotel in Business Bay offering stylish rooms, restaurants, pools and spa facilities.',
      amenities: [
        {
          name: 'Free WiFi',
          icon: 'wifi',
        },
        {
          name: 'Swimming Pool',
          icon: 'pool'
        },
        {
          name: 'Spa',
          icon: 'spa'
        }
      ],
      pricing: {
        currency: 'INR',
        currencySymbol: '₹',
        pricePerNight: 8500,
      }
    }
  ];

  

  public filterData = {
    "minValue": 16500,
    "maxLimit": 18500,
    "filters": [
      {
        "head": "Hotel Ratings",
        "type": "radio",
        "formControl": "rating",
        "options": [
          {
            "id": "all",
            "value": "All Ratings",
            "select": true
          },
          {
            "id": "5 stars",
            "value": "five"
          },
          {
            "id": "4 stars",
            "value": "four"
          },
          {
            "id": "3 stars",
            "value": "three"
          },
          {
            "id": "2 stars",
            "value": "two"
          }
        ]
      },
      {
        "head": "Departure Time",
        "type": "boxData",
        "formControl": "departureTime",
        "options": [
          {
            "id": "all",
            "value": "All",
            "icon": "cls-1-arrival",
            "select": true
          },
          {
            "id": "morning",
            "value": "Morning",
            "icon": "cls-1-arrival",
            "select": false
          },
          {
            "id": "afternoon",
            "value": "Afternoon",
            "icon": "cls-1-arrival",
            "select": false
          },
          {
            "id": "evening",
            "value": "Evening",
            "icon": "cls-1-arrival",
            "select": false
          },
          {
            "id": "night",
            "value": "Night",
            "icon": "cls-1-arrival",
            "select": false
          }
        ]
      },
      {
        "head": "Airlines",
        "type": "checkbox",
        "formControl": "airlines",
        "options": [
          {
            "id": "6e",
            "value": "Indigo",
            "select": false
          },
          {
            "id": "ek",
            "value": "Emirates",
            "select": false
          }
        ]
      },
      {
        "head": "Price Range",
        "type": "pricerange",
        "formControl": "priceRange",
        "options": []
      }
    ]
  }

  public requestFormValue:any;

  constructor(public apiService: ApiService, public tripState: TripStateService) { }

  ngOnInit(): void {
    console.log(history.state);
    this.requestFormValue =  this.tripState.get<any>('requestFormValue') || {};
    this.getHotelDetails();
    
  }

  public getHotelDetails() {
    const request = {
      cityId: this.requestFormValue.toCity.split(',')[0].trim(),
      totalDays: this.requestFormValue.totalDays
    };
    this.apiService.searchHotel(request).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.success) {
        }
      }
    });
  }

  public filterChanged(filters: any): void {
    const hotel = this.hotelValues || [];
    this.hotelValues = hotel?.filter((flight: any) => {
      
    });
  }

  public hotelRemovedFun(event:any){
    console.log(event, this.hotelBody);
    this.hotelBody.selectedHotels.splice(event.index, 1);
    this.hotelBody.usedNights = this.hotelBody.usedNights - event.hotelValue.nights;
    console.log(this.hotelBody);
    
  }

}
