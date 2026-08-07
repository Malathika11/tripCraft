import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVisaComponent } from './main-visa.component';

describe('MainVisaComponent', () => {
  let component: MainVisaComponent;
  let fixture: ComponentFixture<MainVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainVisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
