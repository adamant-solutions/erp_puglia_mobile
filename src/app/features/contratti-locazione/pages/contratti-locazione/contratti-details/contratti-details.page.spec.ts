import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContrattiDetailsPage } from './contratti-details.page';

describe('ContrattiDetailsPage', () => {
  let component: ContrattiDetailsPage;
  let fixture: ComponentFixture<ContrattiDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrattiDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
