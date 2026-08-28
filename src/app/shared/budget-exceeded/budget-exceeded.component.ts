import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-budget-exceeded',
  templateUrl: './budget-exceeded.component.html',
  styleUrls: ['./budget-exceeded.component.scss']
})
export class BudgetExceededComponent implements OnInit {

  @Input() public budgetExceed:any;

  @Output() cancel = new EventEmitter<void>();

  @Output() continueAnyway = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  public onCancel() {
    this.cancel.emit();
  }

  public onContinue() {
    this.continueAnyway.emit();
  }
  
}
