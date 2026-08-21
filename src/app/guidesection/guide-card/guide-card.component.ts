import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-guide-card',
  templateUrl: './guide-card.component.html',
  styleUrls: ['./guide-card.component.scss']
})
export class GuideCardComponent implements OnInit {

  @Input() public tripDays:any;

  public selectedGuide:any = null;

  public guides:any; 

  public needGuide: boolean = true;

  @Input() public guideResponseValue:any;
  
  constructor(public sharedData: SharedDataService) { }

  ngOnInit(): void {
    console.log(this.guideResponseValue);
    this.guides = this.guideResponseValue;
  }

  public toggle(value: boolean) {
    this.needGuide = value;
  }

  public selectGuide(guide: any) {
    console.log(guide);
    let guideDetails:any = '';
    if (this.selectedGuide?.id === guide.id) {
      // Already selected → Deselect
      this.selectedGuide = '';
      guideDetails = '';
    } else {
      // Select new guide
      this.selectedGuide = guide;
      guideDetails = {
        name: guide.name,
        icon: 'cls-22-single-person',
        tripDays: this.tripDays,
        details: [
          {
            lable: 'Experience',
            value: guide.experience + ' years',
          },
          {
            lable: 'Daily Rate',
            value: guide.perDayPrice,
            amount: true
          },
          {
            lable: 'Duration',
            value: this.tripDays + ' Days',
          }
        ],
        totalCost: guide.perDayPrice * this.tripDays
      }
    }
    console.log(this.selectedGuide);
    
    this.sharedData.setData({
      selectDetails: guideDetails,
      selectHoleValue: this.selectedGuide
    });
  }

}