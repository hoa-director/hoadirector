import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastObjectionsComponent } from './past-objections.component';

describe('PastObjectionsComponent', () => {
  let component: PastObjectionsComponent;
  let fixture: ComponentFixture<PastObjectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastObjectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastObjectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
