import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatrimonioPage } from './patrimonio.page';

describe('PatrimonioPage', () => {
  let component: PatrimonioPage;
  let fixture: ComponentFixture<PatrimonioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
