import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CicloPassivoPage } from './ciclo-passivo.page';

describe('CicloPassivoPage', () => {
  let component: CicloPassivoPage;
  let fixture: ComponentFixture<CicloPassivoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CicloPassivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
