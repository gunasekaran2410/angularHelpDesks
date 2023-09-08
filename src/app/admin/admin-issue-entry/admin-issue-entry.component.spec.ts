import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIssueEntryComponent } from './admin-issue-entry.component';

describe('AdminIssueEntryComponent', () => {
  let component: AdminIssueEntryComponent;
  let fixture: ComponentFixture<AdminIssueEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIssueEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIssueEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
