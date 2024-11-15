import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnagraficaDetailsPage } from './anagrafica-details.page';

describe('AnagraficaDetailsPage', () => {
  let component: AnagraficaDetailsPage;
  let fixture: ComponentFixture<AnagraficaDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagraficaDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
