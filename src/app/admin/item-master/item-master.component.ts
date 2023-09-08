import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as saveAs from 'file-saver';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements OnInit {

  submit: boolean = true;
  selectItem:any;
  allitemTableData: any;
  searchItemTableData: any ;
  user_id: any;
  activecode: any;
    activepractice: any;
  activeclaim: any;
  brands:any;
  systemNames:any;
  brandNames:any;
  system_name: boolean = false;
  item_show: boolean = false;
  serial_no: boolean = false;
  pagintions_empty = false;
  page = 1;

  itemMaster = {
     "id": null as any,
    "refItemID": null,
    "issueTypeID": "",
    "idUser": null,
    "itemTypeID": "",
    "itemName": null,
    "serialNo": null,
    "itemDescription": null,
    "brandName": null,
    "isWarranty": null,
    "warrantyMonths": null as any,
    "purchaseNo": null,
    "purchaseDate": null as any,
    "supplier": null,
    "deActiveReason": null,
    "isActive": true,
    "createdBy": "",
  }

  issueCategory:any;
  itemTypes:any;
  // user_id: any;
  bsValue = new Date();
  chargename: any;
  pages!:number;
  pageSize = 5;

  searchtext:any;
  searchtext1:any;
  create_id: any;
  statusCode_itemName: any;
  statusResult_itemName: any;
  data_result: any;
  statusCode_serialno: any;
  statusResult_serialno: any;
  data_result_serial_no: any;
  update_check_id: any;
  searchtextAlt = '';
  searchtextAlt1 = '';
  alluserDetails: any;
  chargename1: any;
  constructor(private service: AllServicesService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getissueCategory();
    this.getitemTypes();
    this.getitemBrand();
    this.getSystemType();
    this.getallMaster();
    this.getallUser();
  }

  fileName= 'ExcelSheet.xlsx';


  public exportAsExcelFile(): void {
    let json =  this.searchItemTableData;
    let excelFileName ='itemMaster';
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

  searchFilter(){
    this.page = 1;
    this.searchtextAlt = this.searchtext;
    console.log(this.page, "Search");
  }

  searchFilter1(){
    this.page = 1;
    this.searchtextAlt1 = this.searchtext1;
    console.log(this.page, "Search");
  }

  selectType_name(){
    console.log('this.allitemTableData',this.allitemTableData);
    console.log('selectItem',this.selectItem);
    let arr =[];

    for(let i = 0 ; i< this.allitemTableData.length ; i++){
      // console.log('match',this.allitemTableData[i].id+'='+ this.selectItem);
      if(+this.allitemTableData[i].id === +this.selectItem){
        // arr.push(this.allitemTableData[i]);
         var refITEMfilematch = this.allitemTableData[i];
         console.log(refITEMfilematch, "MATCH REF")
      }

    }
    for(let i = 0 ; i< this.allitemTableData.length ; i++){
      // console.log('match',this.allitemTableData[i].id+'='+ this.selectItem);
      console.log(refITEMfilematch, "refITEMfilematch")
      if(+this.allitemTableData[i].id === +refITEMfilematch.id ){
        arr.push(this.allitemTableData[i]);
      }
      if( +this.allitemTableData[i].refItemID === +refITEMfilematch.id){
        arr.push(this.allitemTableData[i]);
      }
      this.searchItemTableData = arr;
    }

  }

  clearSystemName()
  {
    this.selectItem = ''
    this.searchItemTableData = this.allitemTableData;
    this.getallMaster();

  }



  typeChange(event:any){
    for (let i = 0; i < this.itemTypes.length; i++) {
      if (this.itemTypes[i].id == event.target.value) {
        this.chargename = this.itemTypes[i].itemTypeName
        console.log(this.chargename, "NAME")
        if (this.chargename == "Computer" || this.chargename == "Laptop") {
          console.log("one")
          this.system_name = false;
        }
        else{
          this.system_name = true;
        }

      }
    }
  }


  getissueCategory() {
    this.service.getissueCategorys().subscribe((res: any) => {
      console.log(res, "Data");
      this.issueCategory = res;

    })
  }


     // Sysytem Get
     getSystemType() {
      this.service.getSystemTypes().subscribe((res: any) => {
        console.log(res, "system Data");
         this.systemNames = res;

      })
    }

  getitemTypes() {
    this.service.getItemType().subscribe((res: any) => {
      console.log(res, "itemTypes");
      this.itemTypes = res;

    })
  }

  getitemBrand() {
    this.service.getBrand().subscribe((res: any) => {
      console.log(res, "Brands");
      this.brandNames = res;

    })
  }

  onsubmit(form: NgForm) {



    if(form.value.issueTypeID == '' || form.value.issueTypeID == null){
      this.toastr.error("Please Select Issue Category");
      return;
    }
    if(form.value.itemTypeID == '' || form.value.itemTypeID == null){
      this.toastr.error("Please Select Item Type");
      return;
    }
    if(form.value.itemName == '' || form.value.itemName == null){
      this.toastr.error("Please Select Item Name");
      return;
    }

    if (form.value.id == '' || form.value.id == null) {

    console.log(form.value, "FORM DATA");


    form.value.refItemID = parseInt(form.value.refItemID);
     form.value.issueTypeID = parseInt(form.value.issueTypeID);
     form.value.itemTypeID = parseInt(form.value.itemTypeID);
     form.value.idUser = parseInt(form.value.idUser);

     form.value.createdBy = localStorage.getItem('employeeName');

   if(form.value.warrantyMonths == null){
    form.value.warrantyMonths= null;
   }
   else{
    form.value.warrantyMonths = parseInt(form.value.warrantyMonths);
   }

   if(this.update_check_id == '' || this.update_check_id == null){
    this.create_id = 0;
    console.log(this.create_id, "VALUE else");
   }
   else{
    this.create_id = this.update_check_id;
    console.log(this.create_id, "VALUE IF");

   }


  var submit_value ={
    "serialNo" : form.value.serialNo,
    "brandName": form.value.brandName,
    "itemTypeID": form.value.itemTypeID
  }

  console.log(submit_value, "SUBMIT SERIAL");


  this.service.item_masetr_serialno(submit_value, this.create_id).subscribe((res: any) => {


    console.log(res, "");

     this.statusCode_serialno = res['statusCode']
      this.statusResult_serialno = res['statusResult']

    if (this.statusCode_serialno == '0') {
      this.data_result_serial_no = this.statusResult_serialno;
      this.serial_no = true
    }
    else {
     console.log(this.statusResult_serialno);
     this.serial_no = false;
     this.service.createItemMaster(form.value).subscribe((res: any) => {
      console.log(res, "ALL Retrun");

           var statusCode = res['statusCode']
           var statusResult = res['statusResult']

           if (statusCode == '1') {
             this.toastr.success(statusResult);
             this.getallMaster();
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

          //  this.getSystemType();


         });
    }

    // this.alluserDetails = res;

    // if(this.alluserDetails==''){
    //   this.pagintions_empty=false
    // }else{
    //   this.pagintions_empty=true
    // }


  })



  }


  }
login_user_id:any;

  update(form: NgForm) {

    if(form.value.issueTypeID == '' || form.value.issueTypeID == null){
      this.toastr.error("Please Select Issue Category");
      return;
    }
    if(form.value.itemTypeID == '' || form.value.itemTypeID == null){
      this.toastr.error("Please Select Item Type");
      return;
    }
    if(form.value.itemName == '' || form.value.itemName == null){
      this.toastr.error("Please Select Item Name");
      return;
    }


  //  if(this.update_check_id == '' || this.update_check_id == null){
  //   this.create_id = 0;
  //   console.log(this.create_id, "VALUE else");
  //  }
  //  else{
  //   this.create_id = this.update_check_id;
  //   console.log(this.create_id, "VALUE IF");

  //  }




    this.login_user_id = this.update_check_id

    form.value.id = parseInt(this.login_user_id);
    form.value.issueTypeID = parseInt(form.value.issueTypeID);
    form.value.itemTypeID = parseInt(form.value.itemTypeID);
    form.value.warrantyMonths = parseInt(form.value.warrantyMonths);
    form.value.refItemID = parseInt(form.value.refItemID);
    form.value.idUser = parseInt(form.value.idUser);

     form.value.created_by = this.user_id;


     var submit_value ={
      "serialNo" : form.value.serialNo,
      "brandName": form.value.brandName,
      "itemTypeID": form.value.itemTypeID
    }


    this.service.item_masetr_serialno(submit_value, this.login_user_id).subscribe((res: any) => {


      console.log(res);

       this.statusCode_serialno = res['statusCode']
        this.statusResult_serialno = res['statusResult']

      if (this.statusCode_serialno == '0') {
        this.data_result_serial_no = this.statusResult_serialno;
        this.serial_no = true
      }
      else {
       console.log(this.statusResult_serialno);
       this.serial_no = false;
       this.service.updateItemMaster(form.value, form.value.id).subscribe((res: any) => {

        console.log(res, "UPDATE Retrun");

        var statusCode = res['statusCode']
        var statusResult = res['statusResult']

        if (statusCode == '1') {
          this.toastr.success(statusResult)
          this.resetform();
          this.getallMaster();
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
       })
      }

      // this.alluserDetails = res;

      // if(this.alluserDetails==''){
      //   this.pagintions_empty=false
      // }else{
      //   this.pagintions_empty=true
      // }


    })







    // if (form.value.id == '' || form.value.id == null) {
    //   form.value.created_by = this.user_id;
    //   // this.service.createItemMaster(form.value).subscribe((res: any) => {
    //   //   if (res.error_status == 1) {
    //   //     this.getallMaster()
    //   //     this.toastr.success(res.error_message);
    //   //     this.resetform()
    //   //   } else {
    //   //     this.toastr.error(res.error_message);
    //   //   }
    //   // })
    // }
    this.update_check_id ='';

  }
  oncancel() {
    this.submit = true;
    this.update_check_id ='';
    this.resetform()
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onedit(data: any) {

    console.log(data, "EDIT");
    this.submit = false;

    this.itemMaster = Object.assign({}, data);
    let ps_date = new Date(data.purchaseDate)
    this.itemMaster.purchaseDate = ps_date;
    console.log(data, "edit Mode");
    this.update_check_id = data.id;

    console.log(this.update_check_id, "iD Files");
    for (let i = 0; i < this.itemTypes.length; i++) {
      if (this.itemTypes[i].id == data.itemTypeID) {
        this.chargename = this.itemTypes[i].itemTypeName
        console.log(this.chargename, "NAME")
        if (this.chargename == "Computer" || this.chargename == "Laptop") {
          console.log("one")
          this.system_name = false;
        }
        else{
          this.system_name = true;
        }

      }
    }
  }

  ondelete(data: any) {
        this.service.deleteItemMaster(data.id).subscribe((res: any) => {
           this.allitemTableData = res;
           this.searchItemTableData = res;
          console.log(this.allitemTableData, "Delete Data");
          this.getallMaster();
        })
  }

  getallMaster() {
    this.service.getallMasters().subscribe((res: any) => {

      this.searchItemTableData = res;



      this.allitemTableData = res;



      if(this.allitemTableData==''){
        this.pagintions_empty=false
      }else{
        this.pagintions_empty=true
      }
      console.log(this.allitemTableData, "DATAA all");

    })
  }

  handlePageChange(e :any){
    // this.page = e;
    console.log(e);
    this.page = e;
  }

  itemName(event:any){

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
      "itemName" : event.target.value
    }


    this.service.item_masetr_itemname(submit_value, this.create_id).subscribe((res: any) => {


      console.log(res);

       this.statusCode_itemName = res['statusCode']
        this.statusResult_itemName = res['statusResult']

      if (this.statusCode_itemName == '0') {
        this.data_result = this.statusResult_itemName;
        this.item_show = true
      }
      else {
       console.log(this.statusResult_itemName);
       this.item_show = false;
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
    this.itemMaster = {
       id: null as any,
      refItemID: null,
      idUser: null,
      issueTypeID: "",
      itemTypeID: "",
      itemName: null,
      serialNo: null,
      itemDescription: null,
      brandName: null,
      isWarranty:null,
      warrantyMonths: null as any,
      purchaseNo: null,
      purchaseDate: null,
      supplier: null,
      deActiveReason: null,
      isActive: true,
      createdBy: '',
    }
  }
  isHidden=false;

  toggle(){
    this.isHidden=!this.isHidden;
  }
}
