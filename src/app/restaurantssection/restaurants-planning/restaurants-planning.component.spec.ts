import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsPlanningComponent } from './restaurants-planning.component';

describe('RestaurantsPlanningComponent', () => {
  let component: RestaurantsPlanningComponent;
  let fixture: ComponentFixture<RestaurantsPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantsPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantsPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
