import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-visa-status-check',
  templateUrl: './visa-status-check.component.html',
  styleUrls: ['./visa-status-check.component.scss']
})
export class VisaStatusCheckComponent implements OnInit {

  @Output() public visaPopupClose = new EventEmitter<boolean>();

  @Output() public verifyVisa = new EventEmitter<boolean>();
  
  public visaSatatusCheckData:any = {
    headerText: 'visa status check',
    headerPara: 'Before planning your trip, please let us know your visa status.',
    cardData: [
      {
        img: '../../../assets/images/plan_my_trip.png',
        cardHead: 'Continue planning',
        cardPara: 'I want to explore packages and estimate costs. I will provide visa details later.',
        buttonTxt: 'Continue',
        buttonId: 'continue'
      },
      {
        img: '../../../assets/images/visa_assistance.png',
        cardHead: 'need visa assistance',
        cardPara: "I don't have a visa and need help with visa processing. ",
        buttonTxt: 'Apply for visa',
        buttonId: 'apply-for-visa'
      },
      {
        img: '../../../assets/images/verify_existing_visa.png',
        cardHead: 'verify existing visa',
        cardPara: 'I already have a visa and would like TripCraft to veify it.',
        buttonTxt: 'verify visa',
        buttonId: 'verify-visa'
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  public visaStatus(id:string) {
    console.log(id);
    localStorage.setItem('visaStatus', id);
    if(id == 'continue'){
      this.visaPopupClose.emit(false);
    }else if(id == ''){
      
    }else if(id == 'verify-visa'){
      this.visaPopupClose.emit(false);
      this.verifyVisa.emit(true);
    }
  }

}
