import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-transport-card',
  templateUrl: './transport-card.component.html',
  styleUrls: ['./transport-card.component.scss']
})
export class TransportCardComponent implements OnInit {

  @Input() public packageDetails: any;

  public selectedPackage:any; 

  constructor(public sharedData: SharedDataService) { }

  ngOnInit(): void {
  }

  public selectPackage(pkg: any): void {
    let transportSelectValue:any = '';
    if (this.selectedPackage?.id === pkg.id) {      // Already selected → Deselect
      this.selectedPackage = '';
      transportSelectValue = '';
    } else {     // Select new pkg
      this.selectedPackage = pkg;
      transportSelectValue = {
        name: pkg.name,
        icon: pkg.icon,
        tripDays: pkg.tripDays,
        details: [
          {
            lable: 'No of Pax',
            value: pkg.maxPax + ' Pax',
          },
          {
            lable: 'Daily Rate',
            value: pkg.perDayPrice,
            amount: true
          },
          {
            lable: 'Duration',
            value: pkg.tripDays + ' Days',
          }
        ],
        totalCost: pkg.perDayPrice * pkg.tripDays
      }
    }
    this.sharedData.setData({
      selectDetails: transportSelectValue,
      selectHoleValue: this.selectedPackage
    });
  }

}
