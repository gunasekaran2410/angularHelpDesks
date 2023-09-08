import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';
import { InteractionsService } from './interactions.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  username: any;
  create_id: any;
  alert_total:any;
  constructor(private router:Router, private service: AllServicesService,private toastr:ToastrService, private _interactionService: InteractionsService) { }



  ngOnInit(): void {
    $("body").css("background-image", "");
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.username = localStorage.getItem('empName');
       console.log(this.username)

       this._interactionService.teachmessage$.subscribe(message => {
        if(message){
            this.alert_total = message
        }
        else{
          this.alert_total = 0;
        }
       });

  }

  logout(){
    this.router.navigate(["/login"]);
    localStorage.removeItem('departmentName')
    localStorage.removeItem('emailIdoff')
    localStorage.removeItem('Admin')
    localStorage.removeItem('employeeName')
    localStorage.removeItem('empCode')
    localStorage.removeItem('empName')
    localStorage.removeItem('id')
    localStorage.removeItem('mobileNoOff')
    localStorage.removeItem('userTypeID')
    localStorage.removeItem('userTypeName')
  }



}
