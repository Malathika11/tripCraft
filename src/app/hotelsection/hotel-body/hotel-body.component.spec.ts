import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBodyComponent } from './hotel-body.component';

describe('HotelBodyComponent', () => {
  let component: HotelBodyComponent;
  let fixture: ComponentFixture<HotelBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
