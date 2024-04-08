import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from '../Models/loginDto';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../Services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  loginForm! : FormGroup;


constructor(private formBuilder : FormBuilder , private accountService : AccountService, private router : Router, private userStore :UserStoreService){}

ngOnInit(){
  this.loginForm=this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
    password : ['',Validators.required],
  })
}
onSubmit(){
  debugger;
  
  if(this.loginForm.valid){
    const formData = this.loginForm.value;
    const loginDto: LoginDto = {
      email: formData.email,
      password: formData.password
    };
    this.accountService.login(loginDto).subscribe({
      next : (res) =>{
        this.accountService.storeToken(res.token)
        let tokenPayload=this.accountService.decodedToken();
        this.userStore.setRoleForStore(tokenPayload.role);
        this.userStore.setIdForStore(tokenPayload.id);
        this.router.navigate(  ['items']  );

      },
      error : (err)=>{

      }
    })
}else{
  this.validateFormFields(this.loginForm);
}}

private validateFormFields(formGroup :FormGroup){
Object.keys(formGroup.controls).forEach(field=>{
  const control = formGroup.get(field);
  if(control instanceof FormControl){
    control.markAsDirty({onlySelf:true})
  }else if(control instanceof FormGroup){
    this.validateFormFields(control)

  }
})
}


}
