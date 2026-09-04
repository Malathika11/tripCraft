import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-transport-details',
  templateUrl: './transport-details.component.html',
  styleUrls: ['./transport-details.component.scss']
})
export class TransportDetailsComponent implements OnInit {

  public filterData: any;

  public filteredList: any[] = [];

  public allPackages: any;

  public requestFormValue: any;

  public packageValue: any;

  public budgetStatusDetails: any = {
    budget: 0,
    limit: 0,
    pageName: 'Transport',
    routerLabel: 'transportDetails',
    routerURL: 'hotel'
  }

  public loader:boolean = true;

  public noDataMessage: string = '';

  public filterBudgetRemove:boolean = true;

  constructor(public tripState: TripStateService, public apiService: ApiService, public shareData: SharedDataService) { }

  ngOnInit(): void {
    this.requestFormValue =  this.tripState.get<any>('requestFormValue') || {};
    this.packageValue = this.tripState.get<any>('packageCardDetails') || {};
    // fetch/set allPackages here
    this.budgetStatusDetails.budget = this.requestFormValue.budget;
    this.budgetStatusDetails.limit = this.requestFormValue.breakdownForm.amountguide;
    this.getResponse();
    
  }

  ngOnDestroy(): void {
    this.shareData.clearTransport();
  }
  
  public getResponse(){
    const request = {
      city: this.requestFormValue.toCity.split(',')[0].trim(),
      tripDays: this.requestFormValue.totalDays
    };
    this.apiService.searchTransport(request).subscribe({
      next: (response: any) => {
        this.loader = false;
        console.log('SUCCESS RESPONSE:', response);
        this.filterData = response.data?.filterData || {};
        this.allPackages = response.data?.allPackages || [];
        this.filteredList = this.allPackages;
        this.noDataMessage = response.message || '';
      },
      error: (error: any) => {
        console.log('API ERROR:', error);
        this.loader = false;
        this.filterBudgetRemove = false;
        this.filteredList = [];
        this.noDataMessage = error.error?.message || 'No transport packages available for the selected sector.';
      }
    });
  }

  public onFilterChange(event: any): void {
    console.log(event, this.allPackages);
    
    const f = event.filter;

    this.filteredList = this.allPackages.filter((pkg:any) => {
      const transportMatch = !f.transportType?.length || f.transportType.includes(pkg.transportType);
      const vehicleMatch = !f.vehicleType?.length || f.vehicleType.includes(pkg.vehicleType);
      const capacityMatch = f.vehicleCapacity === 'all' || pkg.capacityId === f.vehicleCapacity;
      const durationMatch = f.packageDuration === 'all' || pkg.durationId === f.packageDuration;
      const languageMatch = !f.driverLanguage?.length || f.driverLanguage.some((lang: string) => pkg.languages.includes(lang));
      const priceMatch = pkg.price >= f.priceRange.min && pkg.price <= f.priceRange.max;

      return transportMatch && vehicleMatch && capacityMatch && durationMatch && languageMatch && priceMatch;
    });
    console.log(this.filteredList); 
  }

}
