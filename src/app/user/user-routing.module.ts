import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ChangePasswordComponent } from '../admin/change-password/change-password.component';
import { IssueEntryComponent } from './issue-entry/issue-entry.component';
import { IssueReportStatusComponent } from './issue-report-status/issue-report-status.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: 'user',   component:UserComponent, children:[
    { path: 'issue_entry', component: IssueEntryComponent },
    { path: 'issue_report', component: IssueReportStatusComponent },
    { path: 'user_change', component: UserChangePasswordComponent },
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
