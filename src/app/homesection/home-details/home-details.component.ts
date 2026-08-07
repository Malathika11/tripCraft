import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss']
})
export class HomeDetailsComponent implements OnInit {

  public currentIndex = 0;

  public homeDetails:any;

  public loader: boolean = false;

  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.apiService.get('home').subscribe(res => {
      console.log(res);
      this.homeDetails = res;
      this.loader = true;
    });
    
    setInterval(() => {

      if (this.currentIndex < this.homeDetails.testimonials.length - 3) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }

    }, 5000); // 1 second
  }

  public tripVisaBtn(title:any) {
    if(title == 'Plan my trip'){
      this.router.navigate(['/requestForm'])
    }
  }

}
