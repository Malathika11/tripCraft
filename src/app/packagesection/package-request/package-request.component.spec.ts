import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageRequestComponent } from './package-request.component';

describe('PackageRequestComponent', () => {
  let component: PackageRequestComponent;
  let fixture: ComponentFixture<PackageRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
