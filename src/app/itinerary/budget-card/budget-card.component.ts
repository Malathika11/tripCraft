import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.scss']
})
export class BudgetCardComponent implements OnInit {

  public costBreakdown: any[] = this.commonService.costBreakdown;

  @Output() continueBooking = new EventEmitter<void>();

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

  get remaining(): number {
    return Math.max(
      this.commonService.totalBudget - this.commonService.plannedCost,
      0
    );
  }

}
