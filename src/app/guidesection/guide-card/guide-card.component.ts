import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide-card',
  templateUrl: './guide-card.component.html',
  styleUrls: ['./guide-card.component.scss']
})
export class GuideCardComponent implements OnInit {

  public tripDays=5;

  public selectedGuide:any;

  public guides=[
    {
      id:1,
      name:"Ahmed Al-Rashid",
      rating:4.9,
      reviews:247,
      experience:8,
      price:2500,
      description:"Expert in Dubai cultural heritage and modern attractions.",
      languages:[
        'English',
        'Arabic',
        'Hindi',
        'Urdu'
      ],
      specialities:[
        'Cultural Tours',
        'Shopping',
        'Desert Safari'
      ],
      image:"assets/images/guides/guide1.png"
    },
    {
      id:2,
      name:"Fatima Hassan",
      rating:4.8,
      reviews:189,
      experience:6,
      price:2200,
      description:"Specialized in art, culture and culinary experiences.",
      languages:[
        'English',
        'Arabic',
        'French'
      ],
      specialities:[
        'Art',
        'Museums',
        'Architecture',
        'Food Tours'
      ],
      image:"assets/images/guides/guide2.png"
    },
    {
      id:3,
      name:"Sarah Mitchell",
      rating:4.7,
      reviews:156,
      experience:4,
      price:2000,
      description:"Young energetic guide perfect for families.",
      languages:[
        'English',
        'Spanish',
        'Arabic'
      ],
      specialities:[
        'Family Tours',
        'Beach Activities',
        'Shopping'
      ],
      image:"assets/images/guides/guide3.png"
    }
  ];

  needGuide = true;
  
  constructor() { }

  ngOnInit(): void {
  }


  selectGuide(value: any) {

    this.needGuide = value;

    if (!value) {

      // Hide guide list
      // Reset selected guide
      // Continue button enable

      this.selectedGuide = null;
    }

  }

}