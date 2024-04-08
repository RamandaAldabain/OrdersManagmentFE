import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService , private router: Router ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.accountService.isLoggedIn()) {

      return true;
    } else {
alert("Please Login First");
      return false;
    }
  }
}