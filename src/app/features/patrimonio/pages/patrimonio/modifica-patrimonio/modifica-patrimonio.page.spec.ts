import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaPatrimonioPage } from './modifica-patrimonio.page';

describe('ModificaPatrimonioPage', () => {
  let component: ModificaPatrimonioPage;
  let fixture: ComponentFixture<ModificaPatrimonioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
