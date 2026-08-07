import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {

  public flightDetailsData:any;

  public selected:boolean = false;

  constructor() { }

  ngOnInit(): void {
  this.flightDetailsData = [
      {
        icon : '../../../assets/image/logo.webp',
        name : 'Emirates',
        subName : 'EK 511 . Boeing 777',
        amountType : '$',
        amount : '18,500',
        arrivelTime : '08:30',
        arrivelSector : 'DEL',
        arrivelPlace : 'Indira Gandhi International',
        stopCount : '3h 15m',
        stopType : 'Direct',
        departureTime : '14:45',
        departureSector : 'DXB',
        departurePlace : 'Dubai International',
        stopName : 'Stop in Mumbai (BOM) for 1h 30m'
      },
      {
        icon : '../../../assets/image/logo.webp',
        name : 'Emirates',
        subName : 'EK 511 . Boeing 777',
        amountType : '$',
        amount : '18,500',
        arrivelTime : '08:30',
        arrivelSector : 'DEL',
        arrivelPlace : 'Indira Gandhi International',
        stopCount : '3h 15m',
        stopType : 'Direct',
        departureTime : '14:45',
        departureSector : 'DXB',
        departurePlace : 'Dubai International',
        stopName : 'Stop in Mumbai (BOM) for 1h 30m'
      },
      {
        icon : '../../../assets/image/logo.webp',
        name : 'Emirates',
        subName : 'EK 511 . Boeing 777',
        amountType : '$',
        amount : '18,500',
        arrivelTime : '08:30',
        arrivelSector : 'DEL',
        arrivelPlace : 'Indira Gandhi International',
        stopCount : '3h 15m',
        stopType : 'Direct',
        departureTime : '14:45',
        departureSector : 'DXB',
        departurePlace : 'Dubai International',
        stopName : 'Stop in Mumbai (BOM) for 1h 30m'
      },
      {
        icon : '../../../assets/image/logo.webp',
        name : 'Emirates',
        subName : 'EK 511 . Boeing 777',
        amountType : '$',
        amount : '18,500',
        arrivelTime : '08:30',
        arrivelSector : 'DEL',
        arrivelPlace : 'Indira Gandhi International',
        stopCount : '3h 15m',
        stopType : 'Direct',
        departureTime : '14:45',
        departureSector : 'DXB',
        departurePlace : 'Dubai International',
        stopName : 'Stop in Mumbai (BOM) for 1h 30m'
      },
      {
        icon : '../../../assets/image/logo.webp',
        name : 'Emirates',
        subName : 'EK 511 . Boeing 777',
        amountType : '$',
        amount : '18,500',
        arrivelTime : '08:30',
        arrivelSector : 'DEL',
        arrivelPlace : 'Indira Gandhi International',
        stopCount : '3h 15m',
        stopType : 'Direct',
        departureTime : '14:45',
        departureSector : 'DXB',
        departurePlace : 'Dubai International',
        stopName : 'Stop in Mumbai (BOM) for 1h 30m'
      },
      {
        icon : '../../../assets/image/logo.webp',
        name : 'Emirates',
        subName : 'EK 511 . Boeing 777',
        amountType : '$',
        amount : '18,500',
        arrivelTime : '08:30',
        arrivelSector : 'DEL',
        arrivelPlace : 'Indira Gandhi International',
        stopCount : '3h 15m',
        stopType : 'Direct',
        departureTime : '14:45',
        departureSector : 'DXB',
        departurePlace : 'Dubai International',
        stopName : 'Stop in Mumbai (BOM) for 1h 30m'
      }
    ]
  }
  public flightSelect(){
    this.selected = !this.selected;
  }

}
