import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnagraficaPage } from './anagrafica.page';

describe('AnagraficaPage', () => {
  let component: AnagraficaPage;
  let fixture: ComponentFixture<AnagraficaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagraficaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
