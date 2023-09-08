import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoTypeChartComponent } from './two-type-chart.component';

describe('TwoTypeChartComponent', () => {
  let component: TwoTypeChartComponent;
  let fixture: ComponentFixture<TwoTypeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoTypeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoTypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
