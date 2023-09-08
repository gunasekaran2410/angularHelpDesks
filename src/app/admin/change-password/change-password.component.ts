import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changepassword = {
    'id': "",
    'passwrd': "",
    'confirmPassword': ""
  }

  showerror: boolean = false;

  constructor(private router:Router, private service: AllServicesService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  login_id:any;
  submit(form: NgForm) {

    console.log(form.value, "Form");

    if(form.value.passwrd != form.value.confirmPassword){
        this.showerror = true;
    }else{
         form.value.passwrd == form.value.passwrd
    }



     this.login_id = localStorage.getItem("id");

    form.value.id = parseInt(this.login_id);


    this.service.changePasswordAdmin(form.value.id, form.value).subscribe((res: any) => {

      var statusCode = res['statusCode']
      var statusResult = res['statusResult']

      if (statusCode == '1') {
        this.toastr.success(statusResult);

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
    })
  }
  resetform(form?: NgForm) {
    if (form != null)
  form.resetForm()
  this.changepassword = {
    id: "",
    passwrd: "",
    confirmPassword: ""
  }
  }

}


