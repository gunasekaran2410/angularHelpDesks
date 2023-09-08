import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInterActionService {

  private _userAlertTotal = new Subject<string>();
  teachmessage$ = this._userAlertTotal.asObservable();
  constructor() { }

  sendMessage(message:string){
    this._userAlertTotal.next(message);
  }

}
