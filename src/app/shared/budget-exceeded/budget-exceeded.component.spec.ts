import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExceededComponent } from './budget-exceeded.component';

describe('BudgetExceededComponent', () => {
  let component: BudgetExceededComponent;
  let fixture: ComponentFixture<BudgetExceededComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetExceededComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetExceededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
