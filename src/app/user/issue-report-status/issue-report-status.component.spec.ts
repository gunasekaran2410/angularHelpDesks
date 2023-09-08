import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueReportStatusComponent } from './issue-report-status.component';

describe('IssueReportStatusComponent', () => {
  let component: IssueReportStatusComponent;
  let fixture: ComponentFixture<IssueReportStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueReportStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueReportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
