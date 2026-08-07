import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyExistingVisaComponent } from './verify-existing-visa.component';

describe('VerifyExistingVisaComponent', () => {
  let component: VerifyExistingVisaComponent;
  let fixture: ComponentFixture<VerifyExistingVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyExistingVisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyExistingVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
