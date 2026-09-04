import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-visit-cards',
  templateUrl: './visit-cards.component.html',
  styleUrls: ['./visit-cards.component.scss']
})
export class VisitCardsComponent implements OnInit {

  @Input() public visitDetails: any[] = [];

  @Output() public selectedPlacesChange = new EventEmitter<any[]>();

  @ViewChild('cardWrapper') cardWrapper!: ElementRef<HTMLDivElement>;

  public tripDays: { dayNumber: number; date: Date }[] = [];
  public selectedPlaces: any[] = [];
  public singlePlaceSelect: any;
  public isLeftDisabled = true;
  public isRightDisabled = false;
  public itinerary: { [dayNumber: number]: any[] } = {};
  public formValue: any;
  public showDayStrip = false;
  public selectedDay: any;

  public restDayPopupShow:boolean = false;

  public removeRestDay:boolean = true;

  public readonly MAX_PLACES_PER_DAY = 4;

  constructor(public tripState: TripStateService, public toaster: ToastService) { }

  ngOnInit(): void {
    this.formValue = this.tripState.get<any>('requestFormValue') || {};
    this.tripDays = this.generateTripDays(this.formValue.startDate, this.formValue.totalDays);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateArrowState(), 0);
  }

  public selectPlace(place: any): void {
    const index = this.selectedPlaces.findIndex(item => item.id === place.id);

    if (index > -1) {
      this.selectedPlaces.splice(index, 1);
      this.removeFromItinerary(place);          
    } else {
      this.selectedPlaces.push(place);
      this.singlePlaceSelect = place;
      this.showDayStrip = true;
      this.selectedDay = '';
    }

    this.selectedPlacesChange.emit([...this.selectedPlaces]);
  }

  private removeFromItinerary(place: any): void {
    Object.keys(this.itinerary).forEach(dayKey => {
      const day = Number(dayKey);
      this.itinerary[day] = this.itinerary[day].filter(p => p.id !== place.id);
      if (!this.itinerary[day].length) {
        delete this.itinerary[day];
      }
    });
  }

  public isSelected(place: any): boolean {
    return this.selectedPlaces.some(item => item.id === place.id);
  }

  public scrollLeft(): void {
    this.scroll(-300);
  }

  public scrollRight(): void {
    this.scroll(300);
  }

  private scroll(amount: number): void {
    if (!this.cardWrapper) {
      return;
    }
    this.cardWrapper.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(() => this.updateArrowState(), 350);
  }

  private updateArrowState(): void {
    const el = this.cardWrapper?.nativeElement;
    if (!el) {
      return;
    }
    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    this.isLeftDisabled = scrollLeft <= 0;
    this.isRightDisabled = scrollLeft >= maxScrollLeft - 1;
  }

  private generateTripDays(startDate: any, totalDays: any) {
    const days = Number(totalDays) || 0;                
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return { dayNumber: i + 1, date };
    });
  }

  public isDayFull(day: any): boolean {
    const placesOnDay = this.itinerary[day.dayNumber]?.length || 0;
    return placesOnDay >= this.MAX_PLACES_PER_DAY;
  }

  get placesOnSelectedDay(): number {                    
    return this.selectedDay ? (this.itinerary[this.selectedDay]?.length || 0) : 0;
  }

  public cancel(): void {
    this.showDayStrip = false;
    this.selectPlace(this.singlePlaceSelect);   
  }

  public add(): void {
    if (!this.selectedDay) {
      return;
    }
    if (!this.itinerary[this.selectedDay]) {
      this.itinerary[this.selectedDay] = [];     
    }
    this.itinerary[this.selectedDay].push(this.singlePlaceSelect);
    this.selectedPlaces[this.selectedPlaces.length - 1].selectedDay = this.selectedDay;
    console.log(this.itinerary, this.selectedPlaces, this.selectedDay);
    this.showDayStrip = false;                    
    this.selectedDay = '';
    
  }

  public chooseDay(day: any): void {
    this.selectedDay = day.dayNumber;
  }

  public chooseHeaderDay(day: any){
    this.selectedDay = day.dayNumber;

    const hasActivities = this.itinerary[day.dayNumber]?.length && !this.itinerary[day.dayNumber]?.some(item => item.restFlag);

    if (hasActivities) {
      this.toaster.info('Can’t set as Rest Day — activities are already planned for this day.');
      return; 
    }

    this.restDayPopupShow = true;
    this.removeRestDay = !!this.itinerary[day.dayNumber]?.some(item => item.restFlag);
    
  }

  public restDay(){
    this.restDayPopupShow = false;
    if(this.removeRestDay){
      delete this.itinerary[this.selectedDay];
      return;
    }
    let restIndex = { restFlag: true };

    if (!this.itinerary[this.selectedDay]) {
      this.itinerary[this.selectedDay] = [];
    }
    this.itinerary[this.selectedDay].push(restIndex);
    console.log(this.itinerary);
  }
  
  public restCancel(){
    this.restDayPopupShow = false;
  }

  public isRestDay(dayNumber: number): boolean {
    return !!this.itinerary[dayNumber]?.some(item => item.restFlag);
  }
}