import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TripStateService } from 'src/app/services/trip-state.service';
import { VisitCardsComponent } from '../visit-cards/visit-cards.component';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss']
})
export class VisitDetailsComponent implements OnInit {

  public formValue:any;

  public selectedPlaces: any[] = [];

  public showMyTrip = false;

  public visitDetails: any;

  public loader:boolean = true;

  public noDataMessage:any;

  @ViewChild(VisitCardsComponent) visitCard!: VisitCardsComponent;

  constructor(public tripState: TripStateService, public apiService: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.tripState.get<any>('requestFormValue') || {};
    console.log(this.selectedPlaces);
    this.getVisitPlace();
  }

  public getVisitPlace(){
    const request = {
      city: this.formValue.toCity.split(',')[0].trim(),
      startDate: this.formValue.startDate,
      endDate: this.formValue.endDate
    };
    this.apiService.searchPlace(request).subscribe({
      next: (response: any) => {
        console.log(response);
        if(response.success){
          this.visitDetails = response.data;
          this.loader = false;
        }
      },
      error: (error: any) => {
        console.log(error);
        this.loader = false;
        // this.visitDetails = {};
        this.noDataMessage = error.error.message;
      }
    });
  }

  public selectedPlacesFun(places: any[]): void {
    this.selectedPlaces = places;
    console.log(this.selectedPlaces);
  }

}
