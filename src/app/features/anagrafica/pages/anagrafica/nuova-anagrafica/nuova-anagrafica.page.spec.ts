import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuovaAnagraficaPage } from './nuova-anagrafica.page';

describe('NuovaAnagraficaPage', () => {
  let component: NuovaAnagraficaPage;
  let fixture: ComponentFixture<NuovaAnagraficaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovaAnagraficaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
