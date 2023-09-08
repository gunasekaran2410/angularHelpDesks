import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-issue-category',
  templateUrl: './issue-category.component.html',
  styleUrls: ['./issue-category.component.scss']
})
export class IssueCategoryComponent implements OnInit {

  submit: boolean = true;
  searchtext:any;
  user_id:any;
  issueCategory = {
    "id": null,
    "issueTypeName": null,
    "descriptions": null,
    "isActive": ""
  }
  allcategoryTableData:any;

  constructor(private service: AllServicesService,private toastr:ToastrService) { }

  ngOnInit(): void {
    $("body").css("background-image", "");
    this.getallCategory();
  }

  getallCategory() {
    this.service.getallCategorys().subscribe((res: any) => {
      this.allcategoryTableData = res;
      console.log(this.allcategoryTableData, "category all");
    })
  }

  oncancel() {
    this.submit = true;
    this.resetform()
  }

  onsubmit(form: NgForm) {



    // if(form.value.issueTypeID == '' || form.value.issueTypeID == null){
    //   this.toastr.error("Please Select Issue Category");

    //   if(form.value.itemTypeID == '' || form.value.itemTypeID == null){
    //     this.toastr.error("Please Select Item Type");
    //     return;
    //   }

    // }


    console.log(form.value, "FORM DATA");

    // form.value.id = parseInt(form.value.id);
    //  form.value.issueTypeID = parseInt(form.value.issueTypeID);
    //  form.value.itemTypeID = parseInt(form.value.itemTypeID);
    this.user_id = localStorage.getItem('id');

      form.value.id = parseInt(this.user_id);

     this.service.createCategory(form.value).subscribe((res: any) => {

      console.log("RESponse", res);

      if(res != null){
        this.toastr.success(res);
        this.resetform()
        this.getallCategory()
      }
      else{
        this.toastr.error(res);
      }




      // if (res.error_status == 1) {
      //   this.getallMaster()
      //   this.toastr.success(res.error_message);
      //   this.resetform()
      // } else {
      //   this.toastr.error(res.error_message);
      // }
    })


  }

  edit(data: any) {
    console.log(data, "EDIT");
    this.submit = false;
    this.issueCategory = Object.assign({}, data);
  }

  update(form: NgForm){

    this.user_id = localStorage.getItem('id');


      form.value.id = parseInt(this.user_id);


    this.service.updateCategory(form.value, form.value.id).subscribe((res: any) => {

      console.log(res, "update");

      this.toastr.success(res);
        this.resetform()
        this.getallCategory();

      // if (res.error_status == 1) {
      //   this.getallMaster()
      //   this.toastr.success(res.error_message);
      //   this.resetform()
      //   this.submit = true;
      // } else {
      //   this.toastr.error(res.error_message);
      // }
    })
  }
  resetform(form?: NgForm) {
    if (form != null)
      form.resetForm()
      this.issueCategory = {
        "id": null,
        "issueTypeName": null,
        "descriptions": null,
        "isActive": ""
      }
  }
  deleteFile(data:any){
    this.service.deleteCategory(data.id).subscribe((res: any) => {
      // this.allitemTableData = res;
      console.log(this.allcategoryTableData, "Delete Data");
      this.getallCategory();
    })
  }

}
