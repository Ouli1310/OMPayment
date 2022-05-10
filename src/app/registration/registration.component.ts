import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;

  /* form: any = {
    firstName: null,
    lastName: null,
    email: null,
    msisdn: null,
    password: null,
    profil: null
  }; */



  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      msisdn: ['', Validators.required],
      password: ['', Validators.required],
      profil: ['', Validators.required]
    })

  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get msisdn() {
    return this.registerForm.get('msisdn');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get profil() {
    return this.registerForm.get('profil');
  }

  get f() {
    return this.registerForm.controls;
  }

  /**onSubmit(): void {
    const {firstName, lastName, email, msisdn, password, profil} = this.registerForm.value;
    this.authService.register(firstName, lastName, email, msisdn, password, profil).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message
        this.isSignUpFailed = true;
      }
      
      
    })
  } */

  

  private register(): User{
    const newUser = new User();
    newUser.firstName = this.f['firstName'].value;
    newUser.lastName = this.f['lastName'].value;
    newUser.email = this.f['email'].value;
    newUser.msisdn = this.f['msisdn'].value;
    newUser.password = this.f['password'].value;
    newUser.profil = this.f['profil'].value;

    this.authService.registration(newUser).subscribe ({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },   error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    }
    
     
    )
    console.log(newUser)
    console.log(this.isSignUpFailed)
    console.log(this.isSuccessful)
    return newUser;
  }

  onSubmit() {
    this.register();
  }

  /** onSubmit(): void {
    const{firstName, lastName, email, msisdn, password, profil} = this.form;
    this.authService.register(firstName, lastName, email, msisdn, password, profil)
    .subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  } */



}
