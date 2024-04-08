import { HTTP_INTERCEPTORS, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private accountService : AccountService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) : Observable<HttpEvent<unknown>> {
    const token=this.accountService.getToken();
     if(token){
      req=req.clone({
        setHeaders : {Authorization :`Bearer ${token}`}
      })
     }
    return next.handle(req);
  }
}

 