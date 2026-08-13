import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
declare var $: any;
declare var moment: any;

declare global {
  interface JQuery {
    daterangepicker(options?: any, callback?: any): JQuery;
  }
}

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  public requestForm!: FormGroup;

  public totalPassengers = 1;

  // public dropValue = [
  //   { name: 'Chennai', id: 'chennai' },
  //   { name: 'Chennai1', id: 'chennai1' },
  //   { name: 'Chennai2', id: 'chennai2' },
  //   { name: 'Chennai3', id: 'chennai3' },
  //   { name: 'Bangalore', id: 'bangalore' },
  //   { name: 'Mumbai', id: 'mumbai' },
  //   { name: 'Delhi', id: 'delhi' },
  //   { name: 'Hyderabad', id: 'hyderabad' },
  //   { name: 'Kolkata', id: 'kolkata' },
  // ];

  public submit : boolean = false;

  // public filteredCities = [...this.dropValue];

  public filteredCities: any[] = [];

  public noDataShow: boolean = false;

  private searchSubject = new Subject<any>();

  public activeField: string = '';

  public customeFieldEnable:boolean = false;

  public breakdownItems = [
    { label: 'Flight', controlName: 'flight', amountControl: 'amountflight', icon: 'icon-flight' },
    { label: 'Hotel', controlName: 'hotel', amountControl: 'amounthotel', icon: 'icon-hotel' },
    { label: 'Food', controlName: 'food', amountControl: 'amountfood', icon: 'icon-food' },
    { label: 'Transport', controlName: 'transport', amountControl: 'amounttransport', icon: 'icon-transport' },
    { label: 'Visa', controlName: 'visa', amountControl: 'amountvisa', icon: 'icon-visa' },
    { label: 'Visiting Places', controlName: 'visitingPlaces', amountControl: 'amountvisitingPlaces', icon: 'icon-location' }
  ];

  public breakdownError: string = '';

  // public visaStatusCheck:boolean = false;

  // public visibleVerifyVisa:boolean = false;

  constructor(private fb: FormBuilder, public commonService: CommonService, public apiSevice: ApiService, private toast: ToastService, public router: Router) { 
    this.requestForm = this.fb.group({
      fromCity: ['',Validators.required],
      fromCityId: ['',Validators.required],
      toCity: ['',Validators.required],
      toCityId: ['',Validators.required],
      adults: [1,Validators.required],
      children: [0],
      infants: [0],
      daterange: ['',Validators.required],
      startDate: [''],
      endDate: [''],
      totalDays: [0],
      budgetMode: ['total'],
      budget: ['',Validators.required],
      breakdownForm: this.fb.group({
        flight: [0],
        amountflight: [0],
        hotel: [0],
        amounthotel: [0],
        food: [0],
        amountfood: [0],
        transport: [0],
        amounttransport: [0],
        visa: [0],
        amountvisa: [0],
        visitingPlaces: [0],
        amountvisitingPlaces: [0],
        breakdownTotal: [0]
      })
    });

    if(history.state?.backto){
      console.log(history.state.formValue);
      
      this.requestForm.setValue(history.state.formValue);
      this.requestForm.get('breakdownForm')?.setValue(history.state.formValue?.breakdownForm)
      this.setBudgetMode(this.requestForm.value.budgetMode);
    }
    // if(!localStorage.getItem('visaStatus')){
    //   this.visaStatusCheck = true;
    // }
  }

  ngOnInit(): void {

    this.searchSubject.pipe( debounceTime(300), distinctUntilChanged((prev, curr) =>
        prev.searchText === curr.searchText &&
        prev.fieldName === curr.fieldName
      )
    ).subscribe((data) => {
      this.getDropdownData(data.searchText);
    });
    this.requestForm.get('budget')?.valueChanges.subscribe(() => {
      this.breakdownItems.forEach(item => {
        this.getBreakdownValue(item.controlName, item.amountControl);
      });
    });
  }

  ngAfterViewInit(): void {
    ($('#travelDate') as any).daterangepicker({
      autoApply: true,
      autoUpdateInput: false,
      showDropdowns: true,
      minDate: moment(),
      maxDate: moment().add(1, 'year'),
      locale: {
        format: 'DD MMM YYYY'
      }
    });
    $('#travelDate').on('apply.daterangepicker', (ev: any, picker: any) => {
      const start = picker.startDate;
      const end = picker.endDate;
      this.requestForm.patchValue({
        daterange: start.format('DD MMM YYYY') + ' - ' + end.format('DD MMM YYYY'),
        startDate: start.format('YYYY-MM-DD'),
        endDate: end.format('YYYY-MM-DD'),
        totalDays: end.diff(start, 'days') + 1
      });
      console.log(this.requestForm.value);
    });
  }

  autoselect(name: string) {
    this.activeField = name;
    const searchText = this.requestForm.get(name)?.value?.trim() || '';
    if (searchText.length >= 3) {
      this.filteredCities = [];
      this.searchSubject.next({
        fieldName: name,
        searchText: searchText
      });
    } else {
      this.filteredCities = [];
    }
  }

  getDropdownData(searchText: string) {
    this.noDataShow = false;
    this.apiSevice.searchCity(searchText).subscribe({
      next: (res: any) => {
        (res.length != 0) ? this.filteredCities = res : this.noDataShow = true;
      },
      error: () => {
        this.noDataShow = true;
        this.filteredCities = [];
      }
    });
    console.log(this.requestForm.value);
    
  }

  select(value: any, name: string) {
    this.requestForm.get(name)?.setValue(value?.city);
    this.requestForm.get(name + 'Id')?.setValue(value?.code);
    this.filteredCities = [];
    this.activeField = '';
    this.noDataShow = false;
  }

  swapSector(){
    console.log(this.requestForm.value.fromCityId , this.requestForm.value.toCityId, this.requestForm.value.fromCityId == '' || this.requestForm.value.toCityId == '');
    
    if(this.requestForm.value.fromCityId == '' || this.requestForm.value.toCityId == ''){
      this.toast.warning('Kindly select the sectors');
      return;
    }
    let fromValue = this.requestForm.value.fromCity;
    let fromValueId = this.requestForm.value.fromCityId;
    this.requestForm.get('fromCity')?.setValue(this.requestForm.value.toCity);
    this.requestForm.get('fromCity' + 'Id')?.setValue(this.requestForm.value.toCityId);
    this.requestForm.get('toCity')?.setValue(fromValue);
    this.requestForm.get('toCity' + 'Id')?.setValue(fromValueId);
    console.log(this.requestForm);
    
  }

  updateCount(key: string, value: number) {
    const control = this.requestForm.get(key);
    if (!control) return;
    const newValue = Math.max(0, control.value + value);
    control.setValue(newValue);
    this.updateTotal();
  }

  updateTotal() {
    const values = this.requestForm.value;
    this.totalPassengers = values.adults + values.children + values.infants;
  }

  setBudgetMode(type: string){
    if(type == 'custom' && this.requestForm.get('budget')?.value == 0){
      this.toast.error('kindly enter Total Budget');
      return;
    }else{
      this.requestForm.get('breakdownForm')?.reset();
    }
    this.requestForm.get('budgetMode')?.setValue(type);
    this.customeFieldEnable = type == 'total' ? false : true;

  }

  limitToHundred(event: any, controlName: string) {
    let value = Number(event.target.value);
    if (value > 100) {
      value = 100;
    }
    this.requestForm.get('breakdownForm')?.get(controlName)?.setValue(value, { emitEvent: false });
  }

  getBreakdownValue(controlName: string, amountControl: string) {
    const percent = +this.requestForm.get(['breakdownForm', controlName])?.value || 0;
    const budget = +this.requestForm.get('budget')?.value || 0;
    const amount = Math.round((budget * percent) / 100);
    this.requestForm.get('breakdownForm')?.get(amountControl)?.setValue(amount);
    console.log(percent,budget,amount,this.requestForm.get('breakdownForm'));
    
  }

  validateBreakdown() {
    let total = 0;
    this.breakdownItems.forEach(item => {
      total += +this.requestForm.get(['breakdownForm', item.controlName])?.value || 0;
    });
    (total > 100) ? this.breakdownError = 'Total percentage cannot exceed 100%.' : this.breakdownError = '';
    this.requestForm.get(['breakdownForm', 'breakdownTotal'])?.setValue(total);
  }

  increment() {
    const control = this.requestForm.get('budget');
    control?.setValue((+control.value || 0) + 1);
  }

  decrement() {
    const control = this.requestForm.get('budget');
    const current = +control?.value || 0;
    if (current > 0) {
      control?.setValue(current - 1);
    }
  }

  // public visaPopupCloseEvent(event:any){
  //   console.log(event);
  //   this.visaStatusCheck = event;
  // }

  // public verifyVisaFun(event:any){
  //   this.visibleVerifyVisa = event;
  // }

  // public previousPageLoadEvent(event:any){
  //   this.visaStatusCheck = true;
  //   this.visibleVerifyVisa = false;
  // }

  public findPackage(){
    this.submit = true;
    let fields = ['flight','hotel','food','transport','visa','visitingPlaces']
    console.log(this.requestForm);   
    if(this.requestForm.value.budgetMode == "custom"){
      if(this.requestForm.value.breakdownForm.breakdownTotal != 100){
        this.toast.info('Please complete the custom breakdown until the total reaches 100%.');
        return;
      }
      fields.map((data:any)=>{
        if(this.requestForm.value.breakdownForm[data] == 0 || this.requestForm.value.breakdownForm[data] == null){
          this.toast.info('Please fill all fields.');
          return;
        }
      })
    }
    if(this.requestForm.valid){
      this.router.navigate(['/package'],{
        state: {
          formValue:this.requestForm.value
        }
      }); 
    }
  }
}
