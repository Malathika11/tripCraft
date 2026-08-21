import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.scss']
})
export class FlightFilterComponent implements OnInit, OnChanges {

  @Input() public filterValues: any;

  @Output() public filterChange = new EventEmitter<any>();

  public minValue: number = 0;

  public maxLimit: number = 0;

  public filterForm!: FormGroup;

  public loader: boolean = false;

  @Input() public tripTypeValue:any = 'oneWay';

  @Input() public formData:any;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges( changes: SimpleChanges ): void {
    if ( changes['filterValues']?.currentValue ) {
      this.createFilterForm();
      this.prepareFilter();
      this.loader = true;
    }
    if (this.formData?.[this.tripTypeValue]) {
      this.filterForm.reset();
      console.log(this.filterForm,this.formData);
      this.filterForm.patchValue(this.formData[this.tripTypeValue]);
      this.minValue = Number( this.formData[this.tripTypeValue]?.priceRange.min ?? 0 );
      this.maxLimit = Number( this.formData[this.tripTypeValue]?.priceRange.max ?? 0 );
    }
    
  }

  private prepareFilter(): void {
    if (!this.filterValues) {
      return;
    }
    this.minValue = Number( this.filterValues.minValue ?? 0 );
    this.maxLimit = Number( this.filterValues.maxLimit ?? 0 );
    this.filterValues.filters?.forEach((filter: any) => {     
      if (!filter.options) {
        filter.options = [];
      }
      if ( filter.type === 'radio' || filter.type === 'boxData' ) {
        const selected = filter.options.some( (option: any) => option.select === true );
        if (!selected && filter.options.length) {
          filter.options[0].select = true;
        }
      }
      if ( filter.type === 'checkbox' ) {
        filter.options.forEach( (option: any) => {
          option.select = option.select === true;
        });
      }
    });
  }

  public createFilterForm(): void {
    const formGroup: any = {};
    this.filterValues?.filters?.forEach( (filter: any) => {
      if ( filter.type === 'radio' ) {
        const selected = filter.options?.find( (option: any) => option.select === true );
        formGroup[ filter.formControl ] = new FormControl( selected?.id || filter.options?.[0]?.id || '' );
      }
      else if ( filter.type === 'boxData' ) {
        const selected = filter.options?.find( (option: any) => option.select === true );
        formGroup[ filter.formControl ] = new FormControl( selected?.id || filter.options?.[0]?.id || '' );
      }
      else if ( filter.type === 'checkbox' ) {
        const selected = filter.options?.filter( (option: any) => option.select === true ).map((option: any) => option.id ) || [];
        formGroup[ filter.formControl ] = new FormControl( selected );
      }
      else if ( filter.type === 'pricerange' ) {
        formGroup[ filter.formControl ] = new FormGroup({
          min: new FormControl( this.filterValues.minValue ?? 0 ),
          max: new FormControl( this.filterValues.maxLimit ?? 0 )
        });
      }
    });
    this.filterForm = new FormGroup(formGroup);
  }

  public getOptionId( filter: any, option: any ): string {
    return ( `${filter.formControl}-${option.id}` );
  }

  public optionChanged( option: any, filter: any ): void {
    
    if (!filter?.options) {
      return;
    }
    filter.options.forEach( (item: any) => {
      item.select = item.id === option.id;
    });
    this.filterForm.get(filter.formControl)?.setValue(option.id);
    this.emitChange();
  }

  public checkboxSelect( option: any, filter: any, event: Event ): void {
    const input = event.target as HTMLInputElement;
    const control = this.filterForm.get( filter.formControl );
    if (!control) {
      return;
    }
    let selected = control.value || [];
    if (input.checked) {
      if ( !selected.includes( option.id ) ) {
        selected = [ ...selected, option.id ];
      }
      option.select = true;
    }
    else {
      selected = selected.filter( (id: any) => id !== option.id );
      option.select = false;
    }
    control.setValue(selected);
    this.emitChange();
  }

  public rangeChanged( controlName: string ): void {
    const range = this.filterForm.get( controlName );
    if (!range) {
      return;
    }
    this.minValue = Number( range.get('min')?.value ?? 0 );
    this.maxLimit = Number( range.get('max')?.value ?? this.filterValues.maxLimit );
    this.emitChange();
  }

  public clearFilters(): void {
    this.filterValues?.filters?.forEach( (filter: any) => {
      if ( filter.type === 'radio' ) {
        filter.options.forEach(
          (option: any, index: number) => {
            option.select = index === 0;
          }
        );
      }
      else if ( filter.type === 'boxData' ) {
        filter.options.forEach(
          (option: any, index: number) => {
            option.select = index === 0;
          }
        );
      }
      else if ( filter.type === 'checkbox' ) {
        filter.options.forEach(
          (option: any) => {
            option.select = false;
          }
        );
      }
    });
    this.minValue = Number( this.filterValues.minValue ?? 0 );
    this.maxLimit = Number( this.filterValues.maxLimit ?? 0 );
    this.createFilterForm();
    this.emitChange();
  }

  private emitChange(): void {
    let value = {
      [this.tripTypeValue]: this.filterForm.value
    }
    this.filterChange.emit( value );
  }


}
