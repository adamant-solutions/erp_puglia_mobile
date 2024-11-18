import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RipartizioneSpesePage } from './ripartizione-spese.page';

describe('RipartizioneSpesePage', () => {
  let component: RipartizioneSpesePage;
  let fixture: ComponentFixture<RipartizioneSpesePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RipartizioneSpesePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
