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
    this.datesAndNights =  this.commonService.durationCalculate(this.formDetails);
    console.log(history.state, this.formDetails,this.datesAndNights);
  }

  public goToRequestForm(){
    this.router.navigate(['/requestForm'],{
      state: {
        formValue: this.formDetails,
        backto: true
      }
    }); 
  }
}
