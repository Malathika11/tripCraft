import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCardsComponent } from './visit-cards.component';

describe('VisitCardsComponent', () => {
  let component: VisitCardsComponent;
  let fixture: ComponentFixture<VisitCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
