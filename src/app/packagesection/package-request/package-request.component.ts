import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-package-request',
  templateUrl: './package-request.component.html',
  styleUrls: ['./package-request.component.scss']
})
export class PackageRequestComponent implements OnInit {

  public datesAndNights: any;

  @Input() public formDetails:any;

  constructor(public router: Router, public commonService: CommonService) { }

  ngOnInit(): void {
    console.log(this.formDetails);
    
    const startDate = new Date(this.formDetails.startDate); 
    const endDate = new Date(this.formDetails.endDate);

    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays  = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    console.log(startDate,endDate,diffTime,diffDays);
    
    this.datesAndNights =   diffDays + ' Days / ' +  (diffDays - 1) + ' Nights';
    console.log(history.state, this.formDetails,this.datesAndNights);
  }

  public goToRequestForm(){
    this.router.navigate(['/requestForm'],{
      state: {
        requestFormValue: this.formDetails,
        backto: true
      }
    }); 
  }
}
