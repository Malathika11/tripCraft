import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport-card',
  templateUrl: './transport-card.component.html',
  styleUrls: ['./transport-card.component.scss']
})
export class TransportCardComponent implements OnInit {

  selectedTransport: any = null;

  transportList = [

    {
      id: 1,

      theme: 'blue',

      icon: 'cls-transport-car',

      name: 'Private Cab (With Driver)',

      badge: 'Recommended',

      price: 12500,

      days: 6,

      image: 'assets/images/car.png',

      map: 'assets/images/map1.png',

      distance: 210,

      coverage: '18 Attractions',

      footer: 'Ideal for Families & Groups',

      favourite: false,

      features: [
        'AC Vehicle with Professional Driver',
        'Hotel Pickup & Drop Included',
        'Custom Itinerary Support',
        '24/7 Support'
      ],

      tags: [
        'Flexible',
        'Comfort',
        'Family Friendly'
      ]
    },

    {
      id: 2,

      theme: 'green',

      icon: 'cls-transport-bike',

      name: 'Bike Rental',

      badge: 'Budget Friendly',

      price: 3800,

      days: 6,

      image: 'assets/images/bike.png',

      map: 'assets/images/map2.png',

      distance: 180,

      coverage: '15 Attractions',

      footer: 'Ideal for Couples & Solo Travelers',

      favourite: false,

      features: [
        'Fuel Included (250 KM/day)',
        'Helmet & Insurance Included',
        '24/7 Roadside Assistance',
        'Easy Pickup & Drop'
      ],

      tags: [
        'Budget Friendly',
        'Flexible',
        'Eco Friendly'
      ]
    },

    {
      id: 3,

      theme: 'purple',

      icon: 'cls-transport-bus',

      name: 'Public Transport',

      badge: 'Most Economical',

      price: 1950,

      days: 6,

      image: 'assets/images/bus.png',

      map: 'assets/images/map3.png',

      distance: 140,

      coverage: '12 Attractions',

      footer: 'Ideal for Budget Travelers',

      favourite: false,

      features: [
        'Metro + Bus Pass Included',
        'Airport Transfer Included',
        'Cost Effective',
        'Best For City Travel'
      ],

      tags: [
        'Economical',
        'Eco Friendly'
      ]
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectTransport(item: any) {

    this.selectedTransport = item;

    console.log(item);

  }

  toggleFavourite(item: any) {

    item.favourite = !item.favourite;

  }

}
