import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';
import { InteractionsService } from '../interactions.service';
import * as saveAs from 'file-saver';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  searchtext:any;
  bsValue = new Date();
  userType:any;
  issueDataFiles:any;
  department: any;
  fixed_date_id:any;
  pagintions_empty = false;
  hide_value: boolean = false;
  page = 1;
  pages!:number;
  show_null_options = false;
  acknowldge_show: boolean = true;
  pageSize = 5;

  issuereport ={
    "id": null as any,
    "issueId": "",
    "issueTypeID": "",
    "issueStatus": "",
    "createdDate":"",
    "departmentID": "",
    "monthId":"",
    "yearId": '',
    'idUser':'',
    'issueItemID': '',
    'isItemReplaced': false,
    "departmentConcernedID": "",
    "issueDescription": null,
    "issueStatusID": ""
  }
  expect_date ={
    "id": "",
    "expectDate": new Date(),
    "assignedToID": "",
    "presentRemarks": ""
  }
  fix_date ={
    "id": "",
    "issueTypeID": "",
    "issueItemID": "",
    "isItemReplaced": "",
    "replacedItemID": "",
    "presentRemarks": ""
  }
  reject_date ={
    "id": "",
    "presentRemarks": ""
  }
  reOpen = {
    "id": "",
    "presentRemarks": ""
  }
  hold_file = {
    "id": "",
    "presentRemarks": ""
  }

  allreportTableData: any;
  issueId: any;
  alert_total: any;
  replace_hide: boolean = false;
  create_id: any;
  modalRef?: BsModalRef;
  viewdataFiles:any = [];
  issueCategory: any;
  itemdetailsData: any;
  replaceItems: any;
  create_by_id: any;
  get_issue_item_id: any;
  searchtextAlt: any;
  alluserDetails: any;
  searchItemTableData: any;
  constructor(private service: AllServicesService,private toastr:ToastrService, private modalService: BsModalService,
    private _interactionService: InteractionsService) { }

  ngOnInit(): void {
    this.getUserType();
    this.getIssueStatus();
    this.getDepartment();
    this.getAllReportStatus();
    this.getAllcount();
    this.getissueCategory();
    this.getallUser();
    this.getallMaster();
  }

  fileName= 'ExcelSheet.xlsx';


  public exportAsExcelFile(): void {
    let json =  this.allreportTableData;
    let excelFileName ='Report';
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exceldownload(){
    this.exportAsExcelFile();
    return;

  }

  getallUser() {
    this.service.getallUserRegistartion().subscribe((res: any) => {
      this.alluserDetails = res;

      console.log(this.alluserDetails, "user all data");
    })
  }
  getallMaster() {
    this.service.getallMasters().subscribe((res: any) => {

      this.searchItemTableData = res;


      console.log(this.searchItemTableData, "ITEm");


    })
  }

  getissueCategory() {
    this.service.getissueCategorys().subscribe((res: any) => {
      console.log(res, "Data");
      this.issueCategory = res;

    })
  }

  OnChangeRed(event:any){
     console.log(event.checked, "ANY EVENT");
     if(event.checked == true){
this.replace_hide = true
     }
     else{
      this.replace_hide = false
     }
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

      if(this.allreportTableData==''){
        this.pagintions_empty=false
      }else{
        this.pagintions_empty=true
      }

      // console.log(this.allreportTableData.issueStatusName, "NAME");
      // this.allreportTableData.forEach((element:any) => {
      //   console.log(element.issueStatusName)
      //   if(element.issueStatusName == "Acknowledged"){
      //      this.acknowldge_show = false
      //      console.log('a False')
      //   }
      //   else{
      //     this.acknowldge_show = true
      //     console.log('b true')
      //   }
      // });



      console.log(this.allreportTableData, "report all");
    })



    // *ngIf="data.issueStatusName == 'Completed' || data.issueStatusName == 'Rejected / Not an Issue'"
  }


  getAllcount(){
    this.create_id = localStorage.getItem('id')
    this.service.adminAlert(this.create_id).subscribe((res: any) => {
       this.alert_total = res.length
       this._interactionService.sendMessage(this.alert_total);
    })
  }

  handlePageChange(e :any){
    // this.page = e;
    console.log(e);
    this.page = e;
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

    if(form.value.issueItemID == '' || form.value.issueItemID == null){
      form.value.issueItemID = 0;
    }
    else{
      form.value.issueItemID = parseInt(form.value.issueItemID)
    }

    if(form.value.idUser == '' || form.value.idUser == null){
      form.value.idUser = 0;
    }
    else{
      form.value.idUser = parseInt(form.value.idUser)
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
      this.toastr.error(statusResult)
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
        idUser:'',
        issueItemID:'',
        isItemReplaced:false,
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
expected_date_id:any;

expact_date: boolean = false;
expact_remark: boolean = false;
//  To Update ExpectDate

openModal(template: TemplateRef<any>, data:any) {
  this.modalRef = this.modalService.show(template);
  console.log(data.id, "ID")
  this.expected_date_id = data.id;
}

expectUpdate(form: NgForm){



  if(form.value.expectDate == '' || form.value.expectDate == null){
    this.toastr.error("Please Select expectDate");
    return;
  }
  if(form.value.presentRemarks == '' || form.value.presentRemarks == null){
    this.toastr.error("Please enter Remarks");
    return;
  }

  console.log(form.value)

  form.value.id = this.expected_date_id;

  form.value.assignedToID = parseInt(form.value.assignedToID);


  console.log('click worked');

  this.service.expectDateUpdated(form.value, this.expected_date_id).subscribe((res1: any) => {


    console.log(res1, "Return");

    var statusCode = res1['statusCode']
    var statusResult = res1['statusResult']

    if (statusCode == '1') {
      this.toastr.success(statusResult)
      this.resetform();
      this.getAllcount();
      this.modalRef?.hide();
      this.getAllReportStatus();
    }
    else if(statusCode == '0'){
        this.toastr.warning(statusResult)
      this.resetform()
    }
    else {
      this.toastr.error(statusResult)
      this.resetform()
    }

 })

}


//  To Update ExpectDate
fixed_report(fixed: TemplateRef<any>, data:any) {
  this.modalRef = this.modalService.show(fixed);
  this.fixed_date_id = data.id;

  console.log(data, "FIX DATA")

  this.fix_date = Object.assign({}, data);

  console.log(this.fix_date, "fix date")


  let issue_type_id = data.issueTypeID;

  console.log(issue_type_id, "ISSUETYPEID")


  this.create_by_id = data.createdByID;

  var submit_id ={
    issueTypeID: parseInt(issue_type_id),
    createdByID: this.create_by_id
  }

  this.get_issue_item_id = data.issueItemID

  console.log(this.get_issue_item_id, "get_issue_item_id")

  console.log(submit_id, "check DATA")

    this.service.getItemValue(submit_id).subscribe((res_value: any) => {
      this.itemdetailsData = res_value
      console.log(this.itemdetailsData, "SECO")

      if(this.get_issue_item_id != null){
        this.itemdetailsData = res_value
        this.show_null_options = false
        console.log('ID')
      }
      else{
        this.show_null_options = true
        this.itemdetailsData = res_value
        console.log('no ID')
      }
    });



}
fix_by_id:any;

searchFilter(){
  this.page = 1;
  this.searchtextAlt = this.searchtext;
  console.log(this.page, "Search");
}

changeItemValue(dataValue:any){
  console.log(dataValue.target.value, "CHA")

  var submit_id ={
    issueTypeID: parseInt(dataValue.target.value),
    createdByID: this.create_by_id
  }

  this.service.getItemValue(submit_id).subscribe((res_value: any) => {
    this.itemdetailsData = res_value
  });

}
changeItem(itemValue:any){
  console.log(itemValue.target.value, "CHA")

var item_submit_id ={
  id: parseInt(itemValue.target.value)
}

  this.service.replaceItemValue(item_submit_id).subscribe((res_value_item: any) => {
    this.replaceItems = res_value_item
    console.log(this.replaceItems, "DATA");
  });
}


fixedUpdate(form: NgForm){

  if(form.value.presentRemarks == '' || form.value.presentRemarks == null){
    this.toastr.error("Please enter Remarks");
    return;
  }

  console.log(this.fixed_date_id, "fix ID");

  console.log(form.value, "DATA")

  form.value.id = this.fixed_date_id;
  this.fix_by_id = localStorage.getItem('id')
  form.value.issueTypeID = parseInt(form.value.issueTypeID);
  form.value.issueItemID = parseInt(form.value.issueItemID);
  form.value.replacedItemID = parseInt(form.value.replacedItemID);
  form.value.FixedByID = parseInt(this.fix_by_id);



  this.service.fixedDateUpdated(form.value, this.fixed_date_id).subscribe((res2: any) => {

    var statusCode = res2['statusCode']
    var statusResult = res2['statusResult']

    if (statusCode == '1') {
      this.toastr.success(statusResult)
      this.resetform();
      this.modalRef?.hide();
      this.getAllReportStatus();
    }
    else if(statusCode == '0'){
        this.toastr.warning(statusResult)
      this.resetform()
    }
    else {
      this.toastr.error(statusResult)
      this.resetform()
    }

 })

}

reopened_date_id:any;

//  To Update Reopened
reopened_report(reopened: TemplateRef<any>, data:any) {
  this.modalRef = this.modalService.show(reopened);
  this.reopened_date_id = data.id;
}

reOpenedUpdate(form: NgForm){

  if(form.value.presentRemarks == '' || form.value.presentRemarks == null){
    this.toastr.error("Please enter Remarks");
    return;
  }
  // console.log(this.fixed_date_id, "fix ID");

  // console.log(form.value)

  form.value.id = this.reopened_date_id;




  this.service.reOpenFileUpdated(form.value, this.reopened_date_id).subscribe((res3: any) => {

    var statusCode = res3['statusCode']
    var statusResult = res3['statusResult']

    if (statusCode == '1') {
      this.toastr.success(statusResult)
      this.resetform();
      this.modalRef?.hide();
      this.getAllReportStatus();
    }
    else if(statusCode == '0'){
        this.toastr.warning(statusResult)
      this.resetform()
    }
    else {
      this.toastr.error(statusResult)
      this.resetform()
    }

 })

}

hold_date_id:any;

//  To Update Reopened
hold_report(hold: TemplateRef<any>, data:any) {
  this.modalRef = this.modalService.show(hold);
  this.hold_date_id = data.id;
}



reportHoldUpdate(form: NgForm){

  if(form.value.presentRemarks == '' || form.value.presentRemarks == null){
    this.toastr.error("Please enter Remarks");
    return;
  }

  // console.log(this.fixed_date_id, "fix ID");

  // console.log(form.value)

  form.value.id = this.hold_date_id;




  this.service.reportHoldFileUpdated(form.value, this.hold_date_id).subscribe((res4: any) => {

    var statusCode = res4['statusCode']
    var statusResult = res4['statusResult']

    if (statusCode == '1') {
      this.toastr.success(statusResult)
      this.resetform();
      this.modalRef?.hide();
      this.getAllReportStatus();
    }
    else if(statusCode == '0'){
        this.toastr.warning(statusResult)
      this.resetform()
    }
    else {
      this.toastr.error(statusResult)
      this.resetform()
    }
 })

}


reject_id:any;
//  To Update reject
reject_report(reject: TemplateRef<any>, data:any){
  this.modalRef = this.modalService.show(reject);
  this.reject_id = data.id;
}



rejectUpdate(form: NgForm){

  if(form.value.presentRemarks == '' || form.value.presentRemarks == null){
    this.toastr.error("Please enter Remarks");
    return;
  }
  // console.log(this.fixed_date_id, "fix ID");

  console.log(form.value)

  form.value.id = this.reject_id;
  // this.fix_by_id = localStorage.getItem('id')
  // form.value.FixedByID = parseInt(this.fix_by_id);



  this.service.rejectDateUpdated(form.value, this.reject_id).subscribe((res5: any) => {

    var statusCode = res5['statusCode']
    var statusResult = res5['statusResult']

    if (statusCode == '1') {
      this.toastr.success(statusResult)
      this.resetform();
      this.modalRef?.hide();
      this.getAllReportStatus();
    }
    else if(statusCode == '0'){
        this.toastr.warning(statusResult)
      this.resetform()
    }
    else {
      this.toastr.error(statusResult)
      this.resetform()
    }

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


}
