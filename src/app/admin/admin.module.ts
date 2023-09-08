import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material/material.module';
import { AdminIssueEntryComponent } from './admin-issue-entry/admin-issue-entry.component';
import { AdminIssueReportStatusComponent } from './admin-issue-report-status/admin-issue-report-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueCategoryComponent } from './issue-category/issue-category.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { UserRegistartionComponent } from './user-registartion/user-registartion.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportStatusComponent } from './report-status/report-status.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';
import { TwoTypeChartComponent } from './dashboard/two-type-chart/two-type-chart.component';
import { ItemFilterPipe } from './item-master/item-filter.pipe';
import { ReportComponent } from './report/report.component';
import { ItemTypeChartComponent } from './dashboard/item-type-chart/item-type-chart.component';
import { ToastrModule } from 'ngx-toastr';
import { DepartmentchartComponent } from './dashboard/departmentchart/departmentchart.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminIssueEntryComponent,
    AdminIssueReportStatusComponent,
    DashboardComponent,
    IssueCategoryComponent,
    ItemMasterComponent,
    UserRegistartionComponent,
    ChangePasswordComponent,
    ReportStatusComponent,
    TwoTypeChartComponent,
    ItemFilterPipe,
    ReportComponent,
    ItemTypeChartComponent,
    DepartmentchartComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AdminRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgChartsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ]
})
export class AdminModule { }
