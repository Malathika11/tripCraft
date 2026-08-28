import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() details: any = null;

  @Output() emitPopupDetails = new EventEmitter<any>();

  constructor() { }
  
  ngOnInit(): void {
  }

  public buttonClick(index:any){
    this.emitPopupDetails.emit(index);
  }

}
