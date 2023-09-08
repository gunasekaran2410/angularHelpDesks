import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { IssueEntryComponent } from './issue-entry/issue-entry.component';
import { IssueReportStatusComponent } from './issue-report-status/issue-report-status.component';
import { HeaderComponent } from './UI/header/header.component';
import { FooterComponent } from './UI/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    IssueEntryComponent,
    IssueReportStatusComponent,
    FooterComponent,
    UserChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    MaterialModule,
    FormsModule,
    ModalModule.forRoot(),
    UserRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  exports:[
    IssueEntryComponent
  ]
})
export class UserModule { }
