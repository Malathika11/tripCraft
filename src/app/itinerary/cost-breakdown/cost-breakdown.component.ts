import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cost-breakdown',
  templateUrl: './cost-breakdown.component.html',
  styleUrls: ['./cost-breakdown.component.scss']
})
export class CostBreakdownComponent implements OnInit {

  public costBreakdown: any[] = this.commonService.costBreakdown;

  public plannedCost = this.commonService.plannedCost;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

}
