import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {

  @Input() public flightDetails: any[] = [];

  @Input() public tripTypeValue: any = 'oneWay';

  @Output() public selectFlightDetails = new EventEmitter<any>();

  public loader:boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.flightDetails,this.tripTypeValue);
    
  }

  ngOnChanges( changes: SimpleChanges ): void {
    if ( changes['flightDetails']?.currentValue && changes['tripTypeValue']?.currentValue ) {
      this.loader = false;
    }
  }

  public flightSelect( selectedFlight: any ): void {
    if (selectedFlight.selected) {
      selectedFlight.selected = false;
      this.emitSelectedFlight(null);
      return;
    }
    this.flightDetails.forEach( (flight: any) => {
      flight.selected = false;
    });
    selectedFlight.selected = true;
    this.emitSelectedFlight( selectedFlight );
  }

  private emitSelectedFlight( selectedFlight: any): void {
    this.selectFlightDetails.emit({
      type: this.tripTypeValue,
      flight: selectedFlight
    });
  }
}