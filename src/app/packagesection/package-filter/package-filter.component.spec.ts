import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFilterComponent } from './package-filter.component';

describe('PackageFilterComponent', () => {
  let component: PackageFilterComponent;
  let fixture: ComponentFixture<PackageFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
