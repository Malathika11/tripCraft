import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCardComponent } from './transport-card.component';

describe('TransportCardComponent', () => {
  let component: TransportCardComponent;
  let fixture: ComponentFixture<TransportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
