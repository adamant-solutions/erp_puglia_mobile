import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuovoPatrimonioPage } from './nuovo-patrimonio.page';

describe('NuovoPatrimonioPage', () => {
  let component: NuovoPatrimonioPage;
  let fixture: ComponentFixture<NuovoPatrimonioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovoPatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
