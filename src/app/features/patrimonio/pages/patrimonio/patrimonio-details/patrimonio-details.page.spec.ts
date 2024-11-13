import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatrimonioDetailsPage } from './patrimonio-details.page';

describe('PatrimonioDetailsPage', () => {
  let component: PatrimonioDetailsPage;
  let fixture: ComponentFixture<PatrimonioDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimonioDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
