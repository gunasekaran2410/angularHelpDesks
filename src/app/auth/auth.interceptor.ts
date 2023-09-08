import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('passwrd') != null) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + localStorage.getItem('passwrd'))
      });
      return next.handle(clonedReq).pipe(tap(
        (err: any) => {
          if (err.status == 500) {
            alert("Sorry Timeout. Please try again. It may happen because of Poor Network Connection");

          }
        }
      )
      )
    }
    else
      return next.handle(req.clone());
  }
}
