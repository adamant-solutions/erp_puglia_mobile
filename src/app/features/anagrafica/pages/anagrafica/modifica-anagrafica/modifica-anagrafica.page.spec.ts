import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaAnagraficaPage } from './modifica-anagrafica.page';

describe('ModificaAnagraficaPage', () => {
  let component: ModificaAnagraficaPage;
  let fixture: ComponentFixture<ModificaAnagraficaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaAnagraficaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
