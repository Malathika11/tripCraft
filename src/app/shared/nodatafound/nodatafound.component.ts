import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nodatafound',
  templateUrl: './nodatafound.component.html',
  styleUrls: ['./nodatafound.component.scss']
})
export class NodatafoundComponent implements OnInit {

  @Input() public noDataPara:any;
  
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  public package(){
    this.router.navigate(['/package']);
  }
  
  public modifySec(){
    this.router.navigate(['/requestForm'], {
      state: {
        backto: true
      }
    });
  }

}
