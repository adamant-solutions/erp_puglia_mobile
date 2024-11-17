import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContabilitaPage} from './contabilita.page';

describe('ContabilitaPage', () => {
  let component: ContabilitaPage;
  let fixture: ComponentFixture<ContabilitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContabilitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
