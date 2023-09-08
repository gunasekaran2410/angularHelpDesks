import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeChartComponent } from './item-type-chart.component';

describe('ItemTypeChartComponent', () => {
  let component: ItemTypeChartComponent;
  let fixture: ComponentFixture<ItemTypeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTypeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
