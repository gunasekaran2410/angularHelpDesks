import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistartionComponent } from './user-registartion.component';

describe('UserRegistartionComponent', () => {
  let component: UserRegistartionComponent;
  let fixture: ComponentFixture<UserRegistartionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistartionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistartionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
