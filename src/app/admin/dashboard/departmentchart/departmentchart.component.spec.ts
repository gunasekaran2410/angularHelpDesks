import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentchartComponent } from './departmentchart.component';

describe('DepartmentchartComponent', () => {
  let component: DepartmentchartComponent;
  let fixture: ComponentFixture<DepartmentchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
