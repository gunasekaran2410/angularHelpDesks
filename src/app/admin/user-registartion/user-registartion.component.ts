import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as saveAs from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';


@Component({
  selector: 'app-user-registartion',
  templateUrl: './user-registartion.component.html',
  styleUrls: ['./user-registartion.component.scss']
})
export class UserRegistartionComponent implements OnInit {

  @ViewChild('TABLE') table!: ElementRef;


  bsValue = new Date();
  submit: boolean = true;
  login_user_id:any;
  alluserDetails: any;
  user_id: any;
  activecode: any;
    activepractice: any;
  activeclaim: any;
  userType:any;
  department: any;
  systemNames:any;
  searchtext:any;

  allreportTableData: any;
  issueId: any;
  create_id: any;

  pagintions_empty = false;
  page = 1;
  pages!:number;
  pageSize = 5;
  login_employe_name:any;

  staus_emp_show: boolean = false;

  userRegistartion = {
    "id": null as any,
    "itemName": null,
    "departmentID": "",
    "userTypeID": "",
    "empCode": "",
    "empName": "",
    "passwrd": "",
    "emailIdoff": "",
    "mobileNoOff": "",
    "isActive": true,
    "relievedreason": null,
    "createdBy": "",
  }
  statusCode_emp: any;
  statusResult_emp: any;
  data_result: any;
  statusCode_itemdetails: any;
  statusResult_itemdetails: any;
  staus_itemdetails_show: boolean = false;
  itemdetails_result: any;
  update_check_id: any;
  searchtextAlt: any;



  // user_id: any;

  constructor(private service: AllServicesService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getDepartment();
    this.getUserType();
    this.getallUser();
    this.getSystemType();
  }
  fileName= 'ExcelSheet.xlsx';


  public exportAsExcelFile(): void {
    let json =  this.alluserDetails;
    let excelFileName ='UserRegistration';
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

  // exceldownload(){


  //   let blob: Blob = this.alluserDetails as Blob;
  //   console.log(blob, 'dd');
  //     var download_link = window.URL.createObjectURL(blob);
  //     let a = document.createElement('a');
  //     a.setAttribute('href', download_link);
  //     a.setAttribute('download', `Client Report.xlsx`);
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);


  // }

  // Department Get
  getDepartment() {
    this.service.getDepartments().subscribe((res: any) => {
      console.log(res, "getDepartment");
      this.department = res;

    })
  }

    // UserType Get
  getUserType() {
    this.service.getUserTypes().subscribe((res: any) => {
      console.log(res, "UserType Data");
       this.userType = res;

    })
  }

     // Sysytem Get
     getSystemType() {
      this.service.getSystemTypes().subscribe((res: any) => {
        console.log(res, "system Data");
         this.systemNames = res;

      })
    }

    onsubmit(form: NgForm) {


      console.log(form.value, "Details");

      if(form.value.departmentID == '' || form.value.departmentID == null){
        this.toastr.error("Please Select Department");

        return;
      }
      if(form.value.userTypeID == '' || form.value.userTypeID == null){
        this.toastr.error("Please Select User Type");
        return;
      }

      // if(form.value.itemDetailID == '' || form.value.itemDetailID == null){
      //   this.toastr.error("Please Select System Name");
      //   return;
      // }


      if(form.value.empName == '' || form.value.empName == null){
        this.toastr.error("Please Enter User Name");
        return;
      }

      if(form.value.passwrd == '' || form.value.passwrd == null){
        this.toastr.error("Please Enter Password");
        return;
      }



      if(form.value.departmentConcernedID == '' ||  form.value.departmentConcernedID == undefined){
        form.value.departmentConcernedID = 0;
      }
      else{
        form.value.departmentConcernedID = parseInt(form.value.departmentConcernedID);
      }





      // this.usertype_id = localStorage.getItem('userTypeID');
      // form.value.userTypeID = parseInt(this.usertype_id)

      this.login_employe_name = localStorage.getItem('employeeName');

      // form.value.id = parseInt(this.login_employe_name);
      form.value.itemDetailID = parseInt(form.value.itemDetailID);
      form.value.departmentID = parseInt(form.value.departmentID);
      form.value.userTypeID = parseInt(form.value.userTypeID);
       form.value.created_by = this.login_employe_name;


     console.log(form.value, "all data")

      this.service.createuserRegistartion(form.value).subscribe((res: any) => {

       console.log("Resp issue Report ", res);

       this.allreportTableData = res;

       var statusCode = res['statusCode']
       var statusResult = res['statusResult']

       if (statusCode == '1') {
         this.toastr.success(statusResult)
         this.resetform();
         this.getallUser();
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


    update(form: NgForm){

      console.log(form.value, "UPDATE ")

      if(form.value.departmentID == '' || form.value.departmentID == null){
        this.toastr.error("Please Select Department");

        return;
      }
      if(form.value.userTypeID == '' || form.value.userTypeID == null){
        this.toastr.error("Please Select User Type");
        return;
      }

      // if(form.value.itemDetailID == '' || form.value.itemDetailID == null){
      //   this.toastr.error("Please Select System Name");
      //   return;
      // }


      if(form.value.empName == '' || form.value.empName == null){
        this.toastr.error("Please Enter User Name");
        return;
      }

      if(form.value.passwrd == '' || form.value.passwrd == null){
        this.toastr.error("Please Enter Password");
        return;
      }

      if(form.value.departmentConcernedID == '' ||  form.value.departmentConcernedID == undefined){
        form.value.departmentConcernedID = 0;
      }
      else{
        form.value.departmentConcernedID = parseInt(form.value.departmentConcernedID);
      }

      this.login_user_id = this.update_check_id;

      form.value.id = parseInt(this.login_user_id);

      form.value.departmentID = parseInt(form.value.departmentID);
      form.value.createdBy = localStorage.getItem('employeeName');
      form.value.userTypeID = parseInt(form.value.userTypeID);
      // form.value.itemDetailID = parseInt(form.value.itemDetailID);

       this.service.updateuserRegistartion(form.value, form.value.id).subscribe((res: any) => {

        var statusCode = res['statusCode']
        var statusResult = res['statusResult']

        if (statusCode == '1') {
          this.toastr.success(statusResult)
          this.resetform();
          this.getallUser();
          this.update_check_id='';
        }
        else if(statusCode == '0'){
            this.toastr.warning(statusResult)
          this.resetform()
        }
        else {
          this.toastr.error(statusResult)
          this.resetform()
        }

    this.resetform()


        //  if (res.error_status == 1) {
        //    this.getallUser()
        //    this.toastr.success(res.error_message);
        //    this.resetform()
        //    this.submit = true;
        //  } else {
        //    this.toastr.error(res.error_message);
        //  }
       })
       this.update_check_id ='';
    }

  oncancel() {
    this.submit = true;
    this.resetform()
    this.update_check_id ='';
  }

  handlePageChange(e :any){
    // this.page = e;
    console.log(e);
    this.page = e;
  }

  onedit(data: any) {
    console.log(data, "All Files");
   this.update_check_id = data.id;
   console.log(this.update_check_id, "iD Files");
    this.submit = false;
    // this.getDepartment();
    // this.getUserType();
    // this.getSystemType();
    this.userRegistartion = Object.assign({}, data);

  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  ondelete(data: any) {
    this.service.deleteUserRegister(data.id).subscribe((res: any) => {

      if (res.statusCode === 200) {
        alert('Success')
        }
    let deleteData = res;
      console.log(deleteData, "Delete Data");
      this.getallUser();
    })
}

searchFilter(){
  this.page = 1;
  this.searchtextAlt = this.searchtext;
  console.log(this.page, "Search");
}

  getallUser() {
    this.service.getallUserRegistartion().subscribe((res: any) => {
      this.alluserDetails = res;

      if(this.alluserDetails==''){
        this.pagintions_empty=false
      }else{
        this.pagintions_empty=true
      }

      console.log(this.alluserDetails, "user all data");
    })
  }
  isHidden=false;

  toggle(){
    this.isHidden=!this.isHidden;
  }

  check_empCode(event:any){



    console.log(event.target.value, "VALUE EMP");

    if(this.update_check_id == '' || this.update_check_id == null){
      this.create_id = 0;
      console.log(this.create_id, "VALUE else");
     }
     else{
      this.create_id = this.update_check_id;
      console.log(this.create_id, "VALUE IF");

     }


    var submit_value ={
      "empCode" : event.target.value
    }


    this.service.UR_empcode(submit_value, this.create_id).subscribe((res: any) => {


      console.log(res);

       this.statusCode_emp = res['statusCode']
        this.statusResult_emp = res['statusResult']

      if (this.statusCode_emp == '0') {
        this.data_result = this.statusResult_emp;
        this.staus_emp_show=true;
      }
      else {
       console.log(this.statusResult_emp);
       this.staus_emp_show=false;
      }

      // this.alluserDetails = res;

      // if(this.alluserDetails==''){
      //   this.pagintions_empty=false
      // }else{
      //   this.pagintions_empty=true
      // }


    })

  }

  systemChange(event:any){


     console.log(event.target.value, "VALUE");

     if(this.update_check_id == '' || this.update_check_id == null){
      this.create_id = 0;
      console.log(this.create_id, "VALUE else");
     }
     else{
      this.create_id = this.update_check_id;
      console.log(this.create_id, "VALUE IF");

     }

     console.log(event.target.value, "VALUE EMP");

     var submit_value ={
       "itemDetailID" : parseInt(event.target.value)
     }

    //  form.value.itemDetailID = parseInt(form.value.itemDetailID);


     this.service.UR_systemName(submit_value, this.create_id).subscribe((res: any) => {


       console.log(res);

        this.statusCode_itemdetails = res['statusCode']
         this.statusResult_itemdetails = res['statusResult']

       if (this.statusCode_itemdetails == '0') {
         this.itemdetails_result = this.statusResult_itemdetails;
         this.staus_itemdetails_show=true;
       }
       else {
        console.log(this.statusResult_itemdetails);
        this.staus_itemdetails_show=false;
       }

       // this.alluserDetails = res;

       // if(this.alluserDetails==''){
       //   this.pagintions_empty=false
       // }else{
       //   this.pagintions_empty=true
       // }


     })

  }

  resetform(form?: NgForm) {
    if (form != null)
      form.resetForm()
    this.userRegistartion = {
      id: null as any,
      itemName: null,
      departmentID: "",
      userTypeID: "",
      empCode: "",
      empName: "",
      passwrd: "",
      emailIdoff: "",
      mobileNoOff: "",
      isActive: true,
      relievedreason: null,
      createdBy: "",
    }
  }


}
