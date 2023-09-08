import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {

  readonly rootURL = environment.baseUrl



  constructor(private http: HttpClient) {

  }

  /* Login */
loginusers(data: any, passwrd:any) {
  return this.http.get(`${this.rootURL}/CheckLogin/${data},${passwrd}`)
}


// Admin
// Issue Category get
getissueCategorys() {
  return this.http.get(`${this.rootURL}/IssueType`)
}
// Item Type get
getItemType(){
  return this.http.get(`${this.rootURL}/ItemType`)
}

// Item Brand Name get
getBrand(){
  return this.http.get(`${this.rootURL}/BrandName`)
}

// Item Master Post
createItemMaster(data: any) {
  return this.http.post(`${this.rootURL}/ItemDetail`, data);
}

// Item Master Update
updateItemMaster(data: any, id: any) {
  return this.http.put(`${this.rootURL}/ItemDetail/${id}`, data);
}


// Item Master Delete
deleteItemMaster( id: any) {
  return this.http.delete(`${this.rootURL}/ItemDetail/${id}`);
}

getallMasters() {
  return this.http.get(`${this.rootURL}/ItemDetail`);
}

// item name Check
item_masetr_itemname(data: any, id: any){
  return this.http.put(`${this.rootURL}/CheckDuplicateItem/CheckItemName?id=${id}`, data);
}

// Serial number Check
item_masetr_serialno(data: any, id: any){
  return this.http.put(`${this.rootURL}/CheckDuplicateItem/CheckItemSerialNo?id=${id}`, data);
}


// User Registartion
getIssueData(){
  return this.http.get(`${this.rootURL}/IssueStatus`)
}

//  Get Department
getDepartments() {
  return this.http.get(`${this.rootURL}/Department`)
}

//  Get User Type
getUserTypes(){
  return this.http.get(`${this.rootURL}/UserType`)
}

//  Get User Type
getIssueType(){
  return this.http.get(`${this.rootURL}/IssueType`)
}

//  Get User Type
getSystemTypes(){
  return this.http.get(`${this.rootURL}/SystemName`)
}

//  Get User base Type
getUserSystemTypes(data:any){
  return this.http.post(`${this.rootURL}/SystemName/GetUserSystem`, data);
}

// UserCode check
UR_empcode(data: any, id: any) {
  return this.http.put(`${this.rootURL}/CheckDuplicateUser/CheckUserCode?id=${id}`, data);
}

// SystemName check
UR_systemName(data: any, id: any) {
  return this.http.put(`${this.rootURL}/CheckDuplicateUser/CheckUserSystem?id=${id}`, data);
}


createuserRegistartion(data: any) {
  return this.http.post(`${this.rootURL}/EmpMast`, data);
}
updateuserRegistartion(data: any, id: any) {
  return this.http.put(`${this.rootURL}/EmpMast/${id}`, data);
}

getallUserRegistartion() {
  return this.http.get(`${this.rootURL}/EmpMast`);
}

deleteUserRegister( id: any) {
  return this.http.delete(`${this.rootURL}/EmpMast/${id}`);
}


// admin issue Category



getallCategorys() {
  return this.http.get(`${this.rootURL}/IssueType`);
}

createCategory(data:any) {
  return this.http.post(`${this.rootURL}/IssueType`, data);
}

updateCategory(data: any, id: any) {
  return this.http.put(`${this.rootURL}/IssueType/${id}`, data);
}


// admin Change Password

changePasswordAdmin(id: any, data:any) {
  // return this.http.post(`${this.rootURL}/EmpMast/${id},${passwrd}`)
  return this.http.put(`${this.rootURL}/ChangePassword/${id}`, data)
}

// User issue Entry

imageUpload(data: any){
  return this.http.post(`${this.rootURL}/UploadIssueImage/`, data);
}

updateIssueEntry(data: any, id:any) {
  return this.http.put(`${this.rootURL}/IssueDetail/${id}`, data);
}


createIssueEntry(data: any) {
  return this.http.post(`${this.rootURL}/IssueDetail/Save`, data);
}




createIssueUpdate(data:any, id:any) {
  return this.http.post(`${this.rootURL}/IssueDetail/${id}`, data);
}

deleteCategory( id: any) {
  return this.http.delete(`${this.rootURL}/ItemDetail/${id}`);
}


// Issue Report

// get all
getallreport(){
  return this.http.get(`${this.rootURL}/IssueDetail`);
}

filterreport(data: any){
  return this.http.post(`${this.rootURL}/IssueDetail/Filter`, data);
}
loadfilter(data: any){
  return this.http.post(`${this.rootURL}/IssueDetail/Filter`, data);
}


expectDateUpdated(data:any, id:any){
  return this.http.put(`${this.rootURL}/UpdateIssueDetail/UpdateExpected?id=${id}`, data);
}

InsertFixedImage(data:any){
  return this.http.post(`${this.rootURL}/UpdateIssueDetail/InsertFixedImage`, data);
}

fixedDateUpdated(data:any, id:any){
  return this.http.put(`${this.rootURL}/UpdateIssueDetail/UpdateFixed?id=${id}`, data);
}


UpdateFixedImage(id:any, data:any){
  return this.http.put(`${this.rootURL}/UpdateIssueDetail/UpdateFixedImage?id=${id}`, data);
}

rejectDateUpdated(data:any, id:any){
  return this.http.put(`${this.rootURL}/UpdateIssueDetail/UpdateCancel?id=${id}`, data);
}
reOpenFileUpdated(data:any, id:any){
  return this.http.put(`${this.rootURL}/UpdateIssueDetail/UpdateReopened?id=${id}`, data);
}
reportHoldFileUpdated(data:any, id:any){
  return this.http.put(`${this.rootURL}/UpdateIssueDetail/UpdateHold?id=${id}`, data);
}
acknowledgeFileUpdated(data:any, id:any){
  return this.http.put(`${this.rootURL}/UpdateIssueDetail/UpdateAcknowledge?id=${id}`, data);
}

getItemValue(data:any){
  return this.http.post(`${this.rootURL}/SystemName/GetIssueItem`, data);
}

replaceItemValue(data:any){
  return this.http.post(`${this.rootURL}/SystemName/GetReplaceItem`, data);
}


// Alert
adminAlert(id: any) {
  return this.http.get(`${this.rootURL}/Alert/GetAdminAlert?userid=${id}`);
}

userCountalert(data:any){
  return this.http.post(`${this.rootURL}/Alert/GetUserAlert`, data);
}


// dashboard
getTotal(data: any){
  return this.http.post(`${this.rootURL}/IssueDetailsView/GetTotalCount`, data);
}

getTypeTotal(data:any){
  return this.http.post(`${this.rootURL}/IssueDetailsView/GetIssueTypeCount`, data);
}

getDepartmentTotal(data:any){
  return this.http.post(`${this.rootURL}/IssueDetailsView/GetDepartmentwiseIssues`, data);
}

getItemTypeTotal(data:any){
  return this.http.post(`${this.rootURL}/IssueDetailsView/GetMonthwiseIssues`, data);
}

}
