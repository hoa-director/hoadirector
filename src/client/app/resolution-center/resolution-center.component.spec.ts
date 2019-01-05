import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionCenterComponent } from './resolution-center.component';

describe('ResolutionCenterComponent', () => {
  let component: ResolutionCenterComponent;
  let fixture: ComponentFixture<ResolutionCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResolutionCenterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolutionCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
