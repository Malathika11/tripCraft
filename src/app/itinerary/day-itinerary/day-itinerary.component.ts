import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-day-itinerary',
  templateUrl: './day-itinerary.component.html',
  styleUrls: ['./day-itinerary.component.scss']
})
export class DayItineraryComponent implements OnInit {

  public days: any[] = this.commonService.days;

  public allExpanded = false;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    console.log(this.days);
    
  }

  public toggle(index: number): void {

    this.days[index].expanded = !this.days[index].expanded;

  }


  public toggleAll(): void {
    this.allExpanded = !this.allExpanded;
    this.days.forEach(day => {
      day.expanded = this.allExpanded;
    });
  }

}
