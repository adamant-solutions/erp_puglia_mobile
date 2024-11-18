import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManutenzionePage } from './manutenzione.page';

describe('ManutenzionePage', () => {
  let component: ManutenzionePage;
  let fixture: ComponentFixture<ManutenzionePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutenzionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
