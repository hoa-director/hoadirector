import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObjectionComponent } from './create-objection.component';

describe('CreateObjectionComponent', () => {
  let component: CreateObjectionComponent;
  let fixture: ComponentFixture<CreateObjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateObjectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateObjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
