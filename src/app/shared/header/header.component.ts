import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public headerData:any = {
    logoImg: '../../../assets/images/logo.png',
    logoText1: 'Trip',
    logoText2: 'Craft',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
