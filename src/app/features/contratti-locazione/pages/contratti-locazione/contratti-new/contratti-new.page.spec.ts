import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContrattiNewPage } from './contratti-new.page';

describe('ContrattiNewPage', () => {
  let component: ContrattiNewPage;
  let fixture: ComponentFixture<ContrattiNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrattiNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
