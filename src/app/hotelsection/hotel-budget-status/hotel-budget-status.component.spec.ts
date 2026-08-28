import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBudgetStatusComponent } from './hotel-budget-status.component';

describe('HotelBudgetStatusComponent', () => {
  let component: HotelBudgetStatusComponent;
  let fixture: ComponentFixture<HotelBudgetStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelBudgetStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelBudgetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
