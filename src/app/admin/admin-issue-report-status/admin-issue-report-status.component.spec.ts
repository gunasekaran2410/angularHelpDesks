import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIssueReportStatusComponent } from './admin-issue-report-status.component';

describe('AdminIssueReportStatusComponent', () => {
  let component: AdminIssueReportStatusComponent;
  let fixture: ComponentFixture<AdminIssueReportStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIssueReportStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIssueReportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
