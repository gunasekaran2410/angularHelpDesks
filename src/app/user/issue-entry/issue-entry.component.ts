import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-issue-entry',
  templateUrl: './issue-entry.component.html',
  styleUrls: ['./issue-entry.component.scss']
})
export class IssueEntryComponent implements OnInit {
  @ViewChild('file') myFileInput:any;
  userType:any;
  file_data_id:any;
  systemNames:any;
  issueEntry = {
    "id": "",
    "issueId": "",
    "issueStatusID": 1,
    "issueItemID": '',
    "imageFile": '',
    "issueTypeID": "",
    "createdByID": "",
    "userTypeID": "",
    "departmentConcernedID": "",
    "issueDescription": null,
  }
  issueId: any;
  file: any;
  userID: any;
  create_id: any;
  alluserDetails: any;
  userway: boolean = false
  loginPerson: any;
  admin_user_id: any;

  // @ViewChild('inputFile') myInputVariable!: ElementRef;


  constructor(private service: AllServicesService,private toastr:ToastrService) { }


  changesType(){
     this.issueEntry.issueItemID = this.systemNames[0].id
  }

  ngOnInit(): void {
    this.getUserType();
    this.get_user_SystemType();
    this.getallUser();
    $("body").css("background-image", "");
    this.loginPerson = localStorage.getItem('userTypeName');

    if(this.loginPerson == "User"){
     this.userway= false;
    }
    else{
      this.userway= true;
    }

    console.log(this.loginPerson, "logi person");
  }


  getallUser() {
    this.service.getallUserRegistartion().subscribe((res: any) => {
      this.alluserDetails = res;
      console.log(this.alluserDetails, "user all data");
    })
  }


  usernameChange(data:any)
  {
    this.admin_user_id = data.target.value
      console.log(data.target.value, "DATA");
      let admin_load_object = {
        idUser: parseInt(this.admin_user_id)
      }

      this.service.getUserSystemTypes(admin_load_object).subscribe((res: any) => {
        console.log(res, "system Data Admin");
         this.systemNames = res;

      })
  }
       // Sysytem Get
       get_user_SystemType() {
        this.create_id = localStorage.getItem('id')
        let load_boject = {
          idUser: parseInt(this.create_id)
        }

        this.service.getUserSystemTypes(load_boject).subscribe((res: any) => {
          console.log(res, "system Data");
           this.systemNames = res;

        })

      }

   // UserType Get
   getUserType() {
    this.service.getIssueType().subscribe((res: any) => {
      console.log(res, "UserType Data");
       this.userType = res;

    })
  }


  uploadnewfile(input: any) {
    if (input.files[0]) {
      this.file = input.files[0]
      console.log(this.file)
      // let formData = new FormData()
      // formData.append('file', this.file)

      // console.log(formData, "FILES")


      // formData.append('virtual_consultation_id', this.virtual_consult_id)
      // formData.append('attachmentno', '1')
      // this.service.FileUploadVirtual(formData).subscribe((res: any) => {
      //   let status = res['error_status']
      //   let message = res['error_message']
      //   if (status == '1') {
      //     this.toastr.success(message, "", { timeOut: 1000 })
      //     this.upload1name = res.file_name
      //     this.upload1path = res.file_path
      //   } else {

      //     this.toastr.error(message, "", { timeOut: 1000 })
      //   }
      // })
    }
  }

  usertype_id:any;

  onsubmit(form: NgForm) {

    if(form.value.issueTypeID == '' || form.value.issueTypeID == null){
      this.toastr.error("Please SelectType");

      return;
    }
    if(form.value.issueDescription == '' || form.value.issueDescription == null){
      this.toastr.error("Please  Issue Descriptions");
      return;
    }

    console.log(this.file, "onsubmit")


      if(this.loginPerson == "User"){

        if(this.file != undefined || this.file != null){

          console.log("IF");

          let  formdatafile = new FormData();
          formdatafile.append("imageFile", this.file);

           console.log(this.file, "EDIT file")



               this.service.imageUpload(formdatafile).subscribe((upload_res: any) => {
                      console.log(upload_res, "Retutn Id");

                      this.file_data_id = upload_res;

                      console.log(this.file_data_id, "test id");

                      this.userID = localStorage.getItem('id')

                     form.value.createdByID = parseInt(this.userID);
                      form.value.issueTypeID = parseInt(form.value.issueTypeID);
                      form.value.issueItemID = parseInt(form.value.issueItemID);
                      form.value.issueStatusID = 1;
                      form.value.id = this.file_data_id;
                     this.usertype_id = localStorage.getItem('userTypeID');


                     this.service.updateIssueEntry(form.value, form.value.id).subscribe((res: any) => {

                      var statusCode = res['statusCode']
        var statusResult = res['statusResult']

        this.myFileInput.nativeElement.value = '';


        if (statusCode == '1') {
          this.toastr.success(statusResult)
          this.resetform();

        }
        else if(statusCode == '0'){
            this.toastr.warning(statusResult)
          this.resetform()
        }
        else {
          this.toastr.error(statusResult)
          this.resetform()
        }
        this.myFileInput.nativeElement.value = '';


                       this.resetform();

                       console.log(res, "Return")

                    })

               })


        }
        else{

          console.log("ELSE")
    if(form.value.issueTypeID == '' || form.value.issueTypeID == null){
          this.toastr.error("Please SelectType");

          return;
        }
        if(form.value.issueDescription == '' || form.value.issueDescription == null){
          this.toastr.error("Please  Issue Descriptions");
          return;
        }

          this.userID = localStorage.getItem('id')

         form.value.createdByID = parseInt(this.userID);
          form.value.issueTypeID = parseInt(form.value.issueTypeID);
          form.value.issueItemID = parseInt(form.value.issueItemID);
          form.value.issueStatusID = 1;

         this.usertype_id = localStorage.getItem('userTypeID');

          this.service.createIssueEntry(form.value).subscribe((res: any) => {

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

            console.log(res, "Return")

         })
        }
      }
      else{
        if(this.file != undefined || this.file != null){

          console.log("IF");

          let  formdatafile = new FormData();
          formdatafile.append("imageFile", this.file);

           console.log(this.file, "EDIT file")



               this.service.imageUpload(formdatafile).subscribe((upload_res: any) => {
                      console.log(upload_res, "Retutn Id");

                      this.file_data_id = upload_res;

                      console.log(this.file_data_id, "test id");


                     form.value.createdByID = parseInt(this.admin_user_id);
                      form.value.issueTypeID = parseInt(form.value.issueTypeID);
                      form.value.issueItemID = parseInt(form.value.issueItemID);
                      form.value.assignedToID = parseInt(form.value.assignedToID);
                      form.value.issueStatusID = 1;
                      form.value.id = this.file_data_id;
                     this.usertype_id = localStorage.getItem('userTypeID');


                     this.service.updateIssueEntry(form.value, form.value.id).subscribe((res: any) => {

                      var statusCode = res['statusCode']
        var statusResult = res['statusResult']

        this.myFileInput.nativeElement.value = '';


        if (statusCode == '1') {
          this.toastr.success(statusResult)
          this.resetform();

        }
        else if(statusCode == '0'){
            this.toastr.warning(statusResult)
          this.resetform()
        }
        else {
          this.toastr.error(statusResult)
          this.resetform()
        }
        this.myFileInput.nativeElement.value = '';


                       this.resetform();

                       console.log(res, "Return")

                    })

               })


        }
        else{

          console.log("ELSE")
    if(form.value.issueTypeID == '' || form.value.issueTypeID == null){
          this.toastr.error("Please SelectType");

          return;
        }
        if(form.value.issueDescription == '' || form.value.issueDescription == null){
          this.toastr.error("Please  Issue Descriptions");
          return;
        }


          form.value.createdByID = parseInt(this.admin_user_id);
          form.value.issueTypeID = parseInt(form.value.issueTypeID);
          form.value.issueItemID = parseInt(form.value.issueItemID);
          form.value.assignedToID = parseInt(form.value.assignedToID);
          form.value.issueStatusID = 1;

         this.usertype_id = localStorage.getItem('userTypeID');

          this.service.createIssueEntry(form.value).subscribe((res: any) => {

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

            console.log(res, "Return")

         })
        }
      }


    console.log("FORM DATA FILE",this.file);

    console.log(form.value, "FORM DATA");








  }
clear(){

  this.resetform();
}

  resetform(form?: NgForm) {



    if (form != null)
      form.resetForm()
    this.issueEntry = {
      id: "",
      issueId: "",
      issueStatusID: 1,
      issueItemID: '',
      imageFile: '',
      createdByID: "",
      issueTypeID: "",
      userTypeID: "",
      departmentConcernedID: "",
      issueDescription: null
    }

    this.myFileInput.nativeElement.value = '';
  }

}
