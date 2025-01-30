import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContrattiEditPage } from './contratti-edit.page';

describe('ContrattiEditPage', () => {
  let component: ContrattiEditPage;
  let fixture: ComponentFixture<ContrattiEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrattiEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
