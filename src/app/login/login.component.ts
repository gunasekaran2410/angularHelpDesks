import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  example:any;
  bg= '../assets/img/bg.jpg'

  @ViewChild('fondovalor') fondovalor!: ElementRef;

  logindatas = {
    'empName': "",
    'passwrd': "",
  }

  userdata: any = [];

  loading_icon: boolean = false;
  login_status: boolean = false;


  getadminflag:any
  statusCode: any;
  statusResult: any;


  constructor(private router:Router, private service: AllServicesService, private toastr:ToastrService) {
    this.getadminflag = localStorage.getItem('admin_flag')
   }

  ngOnInit(): void {


    $('body').css('background-image', 'url(' + this.bg + ')');
    $('body').css('background-size', 'cover');

    this.logindatas = {
      'empName': "",
      'passwrd': "",
    }

    this.getadminflag = localStorage.getItem('admin_flag')

    // if (localStorage.getItem('token') != null && localStorage.getItem('admin_flag') == 'true') {
    //   this.router.navigate(["/super_admin/practice_master"]);
    // }
    // if (localStorage.getItem('token') != null && localStorage.getItem('admin_flag') == 'false') {
    //   this.router.navigate(["/user/new_claim"]);
    // }
  }


  submit(form: NgForm) {

    this.loading_icon=true;
    console.log(form.value, "Form");


    this.service.loginusers(form.value.empName, form.value.passwrd).subscribe((res: any) => {

      console.log(res, "LoginData");



    this.statusCode = res['statusCode']
   this.statusResult = res['statusResult']

    if (this.statusCode == '1') {
      this.toastr.success(this.statusResult)
      form.resetForm()
      this.login_status = false;
    }
    else if(this.statusCode == '0'){
        this.toastr.warning(this.statusResult)
        this.login_status = true;
    }
    else {
   //   this.toastr.error(this.statusResult)
      form.resetForm()
    }

      // userdata = res;
  console.log(res[0].departmentName, "DPT");




      if(res[0].userTypeName == "User"){
        form.resetForm()
        this.toastr.success("Successfully Login")
        this.router.navigate(["/user/issue_entry"]);
        localStorage.setItem('departmentName', res[0].departmentName)
        localStorage.setItem('passwrd', res[0].passwrd)
        localStorage.setItem('emailIdoff', res[0].emailIdoff)
        localStorage.setItem('Admin', res[0].Admin)
        localStorage.setItem('employeeName', res[0].employeeName)
        localStorage.setItem('empCode', res[0].empCode)
        localStorage.setItem('empName', res[0].empName)
        localStorage.setItem('id', res[0].id)
        localStorage.setItem('mobileNoOff', res[0].mobileNoOff)
        localStorage.setItem('userTypeID', res[0].userTypeID)
        localStorage.setItem('userTypeName', res[0].userTypeName)
        this.loading_icon=false;
      }
      else if (res[0].userTypeName == "Manager" || res[0].userTypeName == "Admin"){
        form.resetForm()
        this.toastr.success("Successfully Login")
        this.router.navigate(["/admin/report"]);
        localStorage.setItem('departmentName', res[0].departmentName)
        localStorage.setItem('emailIdoff', res[0].emailIdoff)
        localStorage.setItem('passwrd', res[0].passwrd)
        localStorage.setItem('Admin', res[0].Admin)
        localStorage.setItem('employeeName', res[0].employeeName)
        localStorage.setItem('empCode', res[0].empCode)
        localStorage.setItem('empName', res[0].empName)
        localStorage.setItem('id', res[0].id)
        localStorage.setItem('mobileNoOff', res[0].mobileNoOff)
        localStorage.setItem('userTypeID', res[0].userTypeID)
        localStorage.setItem('userTypeName', res[0].userTypeName)
        this.loading_icon=false;
      }
 else{

 }


      // var message = res.error_message
      // var status = res.error_status


      // if (status == '1') {
      //   if (res.admin_flag == true) {
      //     form.resetForm()
      //     this.toastr.success(message)
      //     this.router.navigate(["/super_admin/practice_master"]);
      //     localStorage.setItem('token', res.token)
      //     localStorage.setItem('user_email', res.user_email)
      //     localStorage.setItem('user_id', res.user_id)
      //     localStorage.setItem('user_name', res.user_name)
      //     localStorage.setItem('user_full_name', res.user_full_name)
      //     localStorage.setItem('user_initial', res.user_initial)
      //     localStorage.setItem('admin_flag', 'true')
      //   }
      //   else {
      //     form.resetForm()
      //     this.toastr.success(message)

      //     localStorage.setItem('token', res.token)
      //     localStorage.setItem('user_email', res.user_email)
      //     localStorage.setItem('user_id', res.user_id)
      //     localStorage.setItem('user_name', res.user_name)
      //     localStorage.setItem('user_full_name', res.user_full_name)
      //     localStorage.setItem('user_initial', res.user_initial)
      //     localStorage.setItem('admin_flag', 'false')
      //   }
      // }
      // else {
      //   this.toastr.error(message)
      // }
    })
  }

  pagego() {
    if(this.example == "user"){
      this.router.navigate(["/user/Issue-entry"]);
    }
    else if (this.example == "admin"){
      this.router.navigate(["/admin/dashboard"]);
    }
  }

}
