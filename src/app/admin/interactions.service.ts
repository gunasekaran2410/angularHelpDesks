import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  private _teachermessageSource = new Subject<string>();
  teachmessage$ = this._teachermessageSource.asObservable();
  constructor() { }

  sendMessage(message:string){
    this._teachermessageSource.next(message);
  }

}
