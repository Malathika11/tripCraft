import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-guide-card',
  templateUrl: './guide-card.component.html',
  styleUrls: ['./guide-card.component.scss']
})
export class GuideCardComponent implements OnInit {

  @Input() public requestForm:any;

  @Output() public transportSelect = new EventEmitter<any>();

  public selectedGuide:any = null;

  public guides:any; 

  public needGuide: boolean = true;

  @Input() public guideResponseValue:any;
  
  constructor(public sharedData: SharedDataService, public router: Router) { }

  ngOnInit(): void {
    console.log(this.guideResponseValue);
    this.guides = this.guideResponseValue;
  }

  public toggle(value: boolean) {
    this.needGuide = value;
    this.transportSelect.emit(value);
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
        tripDays: this.requestForm.totalDays,
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
            value: this.requestForm.totalDays + ' Days',
          }
        ],
        totalCost: guide.perDayPrice * this.requestForm.totalDays
      }
    }
    console.log(this.selectedGuide);
    
    this.sharedData.setData('Guide' , {
      selectDetails: guideDetails,
      selectHoleValue: this.selectedGuide
    });
  }

  public goToTransport(){
    this.router.navigate(['/transport']);
  }

}