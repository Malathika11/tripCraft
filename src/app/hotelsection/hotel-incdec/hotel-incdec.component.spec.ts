import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelIncdecComponent } from './hotel-incdec.component';

describe('HotelIncdecComponent', () => {
  let component: HotelIncdecComponent;
  let fixture: ComponentFixture<HotelIncdecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelIncdecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelIncdecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
