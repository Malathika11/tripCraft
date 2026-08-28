import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent implements OnInit {

  public requestData: any;

  public packageList: any;

  public showContent: boolean = false;

  public contentDetails: any;

  constructor(public apiService: ApiService, public router: Router,public tripState: TripStateService) {}

  ngOnInit(): void {
    this.requestData =  this.tripState.get<any>('requestFormValue') || {};
    if (this.requestData) {
      this.getPackages(this.requestData);
    }
  }

  getPackages(formValue: any): void {
    console.log('requestttttttttttttt', formValue);

    this.apiService.getPackageDetails(formValue).subscribe({
      next: (response) => {
        console.log('Package Response:', response);
        if (response.success) {
          if (response?.status == 'SECTOR_NOT_FOUND' || response?.status == 'DURATION_NOT_FOUND' || response?.status == 'BUDGET_NOT_ENOUGH') {
            this.showContent = true;
            this.contentDetails = response.sentence;
          } else {
            this.showContent = false;
            this.packageList = response.data;
          }
        }
      },
      error: (error) => {
        console.error('Package API Error:', error);
      }
    });

  }

  public handleContentAction(action: string): void {
    console.log('Button action:', action);
    this.showContent = false;
    switch (action) {

      case 'GO_BACK':
        this.goToRequestForm('');
        break;

      case 'CHANGE_DURATION':
        this.goToRequestForm('duration');
        break;

      case 'CHANGE_BUDGET':
        this.goToRequestForm('budget');
        break;

      default:
        console.warn(
          'Unknown action:',
          action
        );
    }
  }

  public goToRequestForm(editField: any) {
    this.router.navigate(['/requestForm'], {
      state: {
        backto: true,
        editField: editField
      }
    });
  }

}
