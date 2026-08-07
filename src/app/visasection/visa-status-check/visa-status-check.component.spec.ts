import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaStatusCheckComponent } from './visa-status-check.component';

describe('VisaStatusCheckComponent', () => {
  let component: VisaStatusCheckComponent;
  let fixture: ComponentFixture<VisaStatusCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaStatusCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaStatusCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
