import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBudgetStatusComponent } from './flight-budget-status.component';

describe('FlightBudgetStatusComponent', () => {
  let component: FlightBudgetStatusComponent;
  let fixture: ComponentFixture<FlightBudgetStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightBudgetStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightBudgetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
