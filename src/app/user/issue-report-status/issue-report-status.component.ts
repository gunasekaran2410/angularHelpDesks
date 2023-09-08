import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';
import { UserInterActionService } from '../user-inter-action.service';

@Component({
  selector: 'app-issue-report-status',
  templateUrl: './issue-report-status.component.html',
  styleUrls: ['./issue-report-status.component.scss']
})
export class IssueReportStatusComponent implements OnInit {
  viewdataFiles:any = [];
  bsValue = new Date();
  userType:any;
  issueDataFiles:any;
  department: any;
  searchtext:any;
  pagintions_empty = false;
  page = 1;
  pages!:number;
  pageSize = 5;

  reOpen = {
    "id": "",
    "presentRemarks": ""
  }
  acknowledgeFile = {
    "id": "",
    "presentRemarks": ""
  }

  issuereport ={
    "id": null as any,
    "issueId": "",
    "issueTypeID": "",
    "issueStatus": "",
    "createdDate":"",
    "departmentID": "",
    "monthId":"",
    "yearId": '',
    "createdByID": "",
    "departmentConcernedID": "",
    "issueDescription": null,
    "issueStatusID": ""
  }
  allreportTableData: any;
  issueId: any;
  create_id: any;
  modalRef?: BsModalRef;
  user_id: any;
  user_alert_total: any;
  createdByID: any;
  create_id_data: any;
  create_id_load: any;
  searchtextAlt: any;

  constructor(private service: AllServicesService,private toastr:ToastrService,  private _interactionService: UserInterActionService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUserType();
    this.getIssueStatus();
    this.getDepartment();
    this.getUseralert();
    // this.filterData_load();
    this.create_id = localStorage.getItem('id')




    let load_boject = {
      createdByID: parseInt(this.create_id)
    }

    this.service.loadfilter(load_boject).subscribe((res: any) => {
      console.log(res, "onload Data");
      this.allreportTableData = res;

    })

  }
  filterData_load(){
    let load_boject = {
      createdByID: parseInt(this.create_id)
    }

    this.service.loadfilter(load_boject).subscribe((res: any) => {
      console.log(res, "onload Data");
      this.allreportTableData = res;

    })
  }

  searchFilter(){
    this.page = 1;
    this.searchtextAlt = this.searchtext;
    console.log(this.page, "Search");
  }



     // UserType Get
     getUserType() {
      this.service.getIssueType().subscribe((res: any) => {
        console.log(res, "UserType Data");
         this.userType = res;

      })
    }

     //  Get issuse Status
     getIssueStatus() {
      this.service.getIssueData().subscribe((res: any) => {
        console.log(res, "issueStatusName Data");
         this.issueDataFiles = res;

      })
    }

  // Department Get
  getDepartment() {
    this.service.getDepartments().subscribe((res: any) => {
      console.log(res, "getDepartment");
      this.department = res;

    })
  }

  getAllReportStatus(){
    this.service.getallreport().subscribe((res: any) => {
      this.allreportTableData = res;
      console.log(this.allreportTableData, "report all");
    })
  }



  usertype_id:any;

  onsubmit(form: NgForm) {


    console.log(form.value, "Details");

    // if(form.value.issueTypeID == '' || form.value.issueTypeID == null){
    //   this.toastr.error("Please Select Issue Category");

    //   return;
    // }
    // if(form.value.issueDescription == '' || form.value.issueDescription == null){
    //   this.toastr.error("Please Select Issue Descriptions");
    //   return;
    // }

     this.create_id = localStorage.getItem('id')

     if(form.value.yearId == '' || form.value.yearId == null){
      form.value.yearId = 0;
    }
    else{
      form.value.yearId =  moment(form.value.yearId).year()
    }

    if(form.value.monthId == '' || form.value.monthId == null){
      form.value.monthId = 0;
    }
    else{
      form.value.monthId = parseInt(form.value.monthId)
    }

    if(form.value.createdDate == '' || form.value.createdDate == null){
      form.value.createdDate = null;
    }
    else{
      form.value.createdDate = moment(form.value.createdDate).format('YYYY-MM-DD');
      console.log(form.value.createdDate);
    }

    if(form.value.departmentConcernedID == '' ||  form.value.departmentConcernedID == undefined){
      form.value.departmentConcernedID = 0;
    }
    else{
      form.value.departmentConcernedID = parseInt(form.value.departmentConcernedID);
    }

    if(form.value.issueTypeID == '' ||  form.value.issueTypeID == undefined){
      form.value.issueTypeID = 0;
    }
    else{
      form.value.issueTypeID = parseInt(form.value.issueTypeID);
    }

    form.value.createdByID = parseInt(this.create_id);

    form.value.issueStatusID = parseInt(form.value.issueStatusID);

    // this.usertype_id = localStorage.getItem('userTypeID');
    // form.value.userTypeID = parseInt(this.usertype_id)






console.log(form.value.yearId, "YEAR");


   form.value.createdByID = parseInt(form.value.createdByID);

   console.log(form.value, "all data")

    this.service.filterreport(form.value).subscribe((res: any) => {

     console.log("Resp issue Report ", res);

     this.allreportTableData = res;

     if(this.allreportTableData==''){
      this.pagintions_empty=false
    }else{
      this.pagintions_empty=true
    }

    var statusCode = res['statusCode']
    var statusResult = res['statusResult']

    if (statusCode == '1') {
      this.toastr.success(statusResult)
      this.resetform()
    }
    else if(statusCode == '0'){
        this.toastr.warning(statusResult)
      this.resetform()
    }
    else {
      // this.toastr.error(statusResult)
      this.resetform()
    }

     this.resetform();

     // if (res.error_status == 1) {
     //   this.getallMaster()
     //   this.toastr.success(res.error_message);
     //   this.resetform()
     // } else {
     //   this.toastr.error(res.error_message);
     // }
   })



  }
  handlePageChange(e :any){
    // this.page = e;
    console.log(e);
    this.page = e;
  }

  resetform(form?: NgForm) {
    if (form != null)
      form.resetForm()
      this.issuereport ={
        id: null as any,
        issueId: "",
        issueTypeID: "",
        issueStatus: "",
        createdDate:"",
        departmentID: "",
        monthId:"",
        yearId:'',
        createdByID: "",
        departmentConcernedID: "",
        issueDescription: null,
        issueStatusID: ""
      }
  }

  onOpenCalendarYear(container:any) {

    container.setViewMode('year');

    container.yearSelectHandler = (event: CalendarCellViewModel): void => {

    container.value = event.date;

    return;
};
}

reopened_date_id:any;

//  To Update Reopened
reopened_report(reopened: TemplateRef<any>, data:any) {
  this.modalRef = this.modalService.show(reopened);
  this.reopened_date_id = data.id;
}

reOpenedUpdate(form: NgForm){

  // console.log(this.fixed_date_id, "fix ID");

  // console.log(form.value)

  form.value.id = this.reopened_date_id;




  this.service.reOpenFileUpdated(form.value, this.reopened_date_id).subscribe((res: any) => {

    this.toastr.success("Successfully Updated");

    this.modalRef?.hide();

    console.log(res, "Return")

    this.filterData_load();

 })



}

acknowledge_date_id:any;

//  To Update Acknowledge
acknowledge_update(reopened: TemplateRef<any>, data:any) {
  this.modalRef = this.modalService.show(reopened);
  this.acknowledge_date_id = data.id;
}

acknowledgeUpdate(form: NgForm){

  // console.log(this.fixed_date_id, "fix ID");

  // console.log(form.value)

  form.value.id = this.acknowledge_date_id;




  this.service.acknowledgeFileUpdated(form.value, this.acknowledge_date_id).subscribe((res: any) => {

    this.toastr.success("Successfully Updated");

    this.modalRef?.hide();

console.log(this.create_id, "ack ID");

    this.filterData_load();
    console.log(res, "Return")

 })



}

view(viewDetails: TemplateRef<any>, data:any) {
  this.modalRef = this.modalService.show(
    viewDetails,
    Object.assign({}, { class: 'gray modal-lg' })
  );

  this.viewdataFiles = data;
  console.log("view Data", this.viewdataFiles)
}
emptydata:any;

getUseralert(){

  this.create_id_load = localStorage.getItem('id')

  var datafile = {
    "createdByID": parseInt(this.create_id_load)
  }


  this.service.userCountalert(datafile).subscribe((res: any) => {

    console.log("USER ALERT", res);

    // this.allreportTableData = res;

    this.user_alert_total = res.length
    this._interactionService.sendMessage(this.user_alert_total);


  })
}
}
