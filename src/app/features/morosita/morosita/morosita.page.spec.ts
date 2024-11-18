import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MorositaPage } from './morosita.page';

describe('MorositaPage', () => {
  let component: MorositaPage;
  let fixture: ComponentFixture<MorositaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MorositaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
