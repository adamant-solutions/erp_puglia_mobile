import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContrattiLocazionePage } from './contratti-locazione.page';

describe('ContrattiLocazionePage', () => {
  let component: ContrattiLocazionePage;
  let fixture: ComponentFixture<ContrattiLocazionePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrattiLocazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
