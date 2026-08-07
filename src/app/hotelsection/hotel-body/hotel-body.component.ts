import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-body',
  templateUrl: './hotel-body.component.html',
  styleUrls: ['./hotel-body.component.scss']
})
export class HotelBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sameHotel = false;

  showPopup = false;

  selectedHotel: any;

  selectedNight = 1;

  remainingNight = 0;

  totalAmount = 0;

  tripTotalNight = 5;

  coveredNights = 0;

  trip = {

    city: 'Paris',

    country: 'France',

    duration: '6 Days / 5 Nights',

    travelers: '2 Adults',

    totalNights: 5

  };

  selectedHotels: any[] = [];

  remainingNights = 5;

  toggleSameHotel() {

    if (this.sameHotel) {

      this.selectedHotels = [];

      this.coveredNights = this.trip.totalNights;

      this.remainingNights = 0;

    } else {

      this.selectedHotels = [];

      this.coveredNights = 0;

      this.remainingNights = this.trip.totalNights;

    }

  }
  hotels = [

    {
      id: 1,
      image: 'assets/images/hotel1.png',
      recommended: true,

      name: 'Hôtel des Arts – Le Marais',

      location: 'Boutique Hotel',

      rating: 4.7,

      reviewCount: '2,015',

      distance: '250 m from city center',

      tags: [
        'Free Breakfast',
        'Boutique'
      ],

      price: 13200
    },

    {
      id: 2,
      image: 'assets/images/hotel2.png',
      recommended: false,

      name: 'Paris Luxury Suites',

      location: 'Luxury Hotel',

      rating: 4.8,

      reviewCount: '1,256',

      distance: '500 m from Eiffel',

      tags: [
        'Swimming Pool',
        'Spa'
      ],

      price: 15800
    }

  ];


  viewDetails(hotel: any) {

    console.log(hotel);

  }

  openNightPopup(hotel: any) {

    this.selectedHotel = hotel;

    this.selectedNight = 1;

    this.remainingNight = this.tripTotalNight - 1;

    this.showPopup = true;

  }
  increaseNight() {

    let available =
      this.trip.totalNights - this.coveredNights;

    if (this.selectedNight < available) {

      this.selectedNight++;

      this.remainingNights =
        this.trip.totalNights -
        this.coveredNights -
        this.selectedNight;

      this.calculateAmount();

    }

  }

  decreaseNight() {

    if (this.selectedNight > 1) {

      this.selectedNight--;

      this.remainingNights =
        this.trip.totalNights -
        this.coveredNights -
        this.selectedNight;

      this.calculateAmount();

    }

  }

  closePopup() {

    this.showPopup = false;

  }
  calculateAmount() {

    this.totalAmount = this.selectedNight * this.selectedHotel.price;

  }

  confirmHotel() {

    const hotel = {

      ...this.selectedHotel,

      nights: this.selectedNight,

      totalAmount: this.totalAmount

    };

    this.selectedHotels.push(hotel);

    this.coveredNights += this.selectedNight;

    this.remainingNights =
      this.trip.totalNights -
      this.coveredNights;

    this.selectedHotel = hotel;

    this.showPopup = false;

    console.log(this.selectedHotels);

  }



}
