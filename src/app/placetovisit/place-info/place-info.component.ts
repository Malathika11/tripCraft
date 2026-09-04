import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss']
})
export class PlaceInfoComponent implements OnInit {

  @Input() public selectedPlaces: any[] = [];
  
  @Output() public closeInfoChange = new EventEmitter<any>();

  @Input() public showInfo = false;

  public totalAmount = 0;

  public budgetPercentage:any;

  public formValue:any;

  @Input() public itineraryValue:any;

  public dayNumbers: number[] = [];

  constructor(public tripState: TripStateService, public router: Router) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formValue = this.tripState.get<any>('requestFormValue') || {};
    console.log(this.itineraryValue, this.selectedPlaces);
    this.dayNumbers = Array.from({ length: this.formValue.totalDays }, (_, i) => i + 1);
    
    if (changes['selectedPlaces']) {
      this.totalAmount = this.selectedPlaces.reduce(
        (total, place) => total + Number(place.price || 0),
        0
      );
      this.budgetPercentage = Math.round((this.totalAmount / this.formValue.breakdownForm.amountvisitingPlaces ) * 100);   
    }
  }

  public closeInfo() {
    this.showInfo = false;
    this.closeInfoChange.emit(false);
  }

  public isRestDay(day: number): boolean {
    return !!this.itineraryValue[day]?.some((item:any) => item.restFlag);
  }

  public getActivities(day: number): any[] {
    return (this.itineraryValue[day] || []).filter((item:any) => !item.restFlag);
  }

  public removeRestDay(day: number): void {
    this.itineraryValue[day] = this.itineraryValue[day].filter((item:any) => !item.restFlag);
  }

  public complete(){
    this.tripState.set('visitPlace', this.itineraryValue);
    this.router.navigate(['/itinerary']);
  }

}
