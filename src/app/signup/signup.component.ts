import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../Services/account.service';
import { RegisterDto } from '../Models/registerDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent {
  signupForm! : FormGroup;
  signupModel = new RegisterDto();
constructor(private formBuilder : FormBuilder , private accountService : AccountService , private router : Router){}


ngOnInit(){
  this.signupForm=this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{6,}$')]],
    confirmPassword: ['',Validators.required],
    userName : ['',Validators.required],
    firstName : ['',Validators.required],
    lastName : ['',Validators.required],
    role : ['',Validators.required],

    

  })
}

onSubmit(){
  debugger;
  if(this.signupForm.valid){
    const formData = this.signupForm.value;
    const registerDto: RegisterDto = {
      id : "0",
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      userName: formData.userName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role : formData.role
    };
    this.accountService.register(registerDto).subscribe(() => {
      this.router.navigate(['login']);
    });

}else{
  this.validateFormFields(this.signupForm);
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


passwordMatchValidator(formGroup: FormGroup) {
  const password = formGroup.controls['password'].value;
  const confirmPassword = formGroup.controls['confirmPassword'].value;
  if (password !== confirmPassword) {
    formGroup.controls['confirmPassword'].setErrors({ mismatch: true });
  } else {
    formGroup.controls['confirmPassword'].setErrors(null);
  }
}






}
