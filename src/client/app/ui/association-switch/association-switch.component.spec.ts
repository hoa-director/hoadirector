import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationSwitchComponent } from './association-switch.component';

describe('AssociationSwitchComponent', () => {
  let component: AssociationSwitchComponent;
  let fixture: ComponentFixture<AssociationSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
