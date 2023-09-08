import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterActionService } from '../../user-inter-action.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: any;
  user_alert_total: any;

  constructor(private router:Router, private _interactionService: UserInterActionService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('empName');
    console.log(this.username, "USER")

    this._interactionService.teachmessage$.subscribe(message => {
      if(message){
          this.user_alert_total = message
          console.log(this.user_alert_total)
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
