import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filterValues : any = [
    {
      head: 'Stops',
      type: 'radio',
      options: [
        {
          id: 'all',
          value: 'All'
        },
        {
          id: 'direct',
          value: 'Direct'
        },
        {
          id: '1 Stop',
          value: '1 Stop'
        },
        {
          id: '2+ Stops',
          value: '2+ Stops'
        }
      ]
    },
    {
      head: 'Departure Time',
      type: 'boxData',
      options: [
        {
          id: 'all',
          value: 'All',
          icon: 'cls-1-arrival',
          select: true
        },
        {
          id: 'morning',
          value: 'Morning',
          icon: 'cls-1-arrival',
          select: false
        },
        {
          id: 'Afternoon',
          value: 'Afternoon',
          icon: 'cls-1-arrival',
          select: false
        },
        {
          id: 'Evening',
          value: 'Evening',
          icon: 'cls-1-arrival',
          select: false
        },
        {
          id: 'Night',
          value: 'Night',
          icon: 'cls-1-arrival',
          select: false
        }
      ]
    },
    {
      head: 'Airlines',
      type: 'checkbox',
      options: [
        {
          id: 'emirates',
          value: 'Emirates'
        },
        {
          id: 'airindia',
          value: 'Air India'
        },
        {
          id: 'indigo',
          value: 'Indigo'
        },
        {
          id: 'vistara',
          value: 'Vistara'
        },
        {
          id: 'spicejet',
          value: 'SpiceJet'
        },
        {
          id: 'airindia',
          value: 'Air India'
        },
        {
          id: 'indigo',
          value: 'Indigo'
        },
        {
          id: 'vistara',
          value: 'Vistara'
        },
        {
          id: 'spicejet',
          value: 'SpiceJet'
        }
      ]
    },
    {
      head: 'Price Range',
      type: 'pricerange',
    }
  ];
  
  public minValue = 0;
  public maxLimit = 25000;

  constructor() { }

  ngOnInit(): void {
  }


  rangeChanged() {
    console.log("Selected Budget :", this.minValue);
  }

  clearFilters() {
    this.minValue = 0;
  }

}
