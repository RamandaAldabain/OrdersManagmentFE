import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponseDto } from '../Models/auth-response-dto';
import { RegisterDto } from '../Models/registerDto';
import { LoginDto } from '../Models/loginDto';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl : string  = `${environment.BaseUrl}`
  private userPayload:any;

  constructor(private http : HttpClient, private router : Router) { 
    this.userPayload = this.decodedToken();
  }

  login(model : LoginDto) : Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/Account/Login`, model); 
   }

   register(model: RegisterDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Account/Register`, model);
  }
  
  storeToken(tokenValue :string){
    localStorage.setItem('token',tokenValue);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean{
    return  !!localStorage.getItem('token');
  }
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }
  getIdFromToken(){
    if(this.userPayload)
    return this.userPayload.id;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
}
