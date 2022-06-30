import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Profil } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { ProfilService } from 'src/app/service/profil.service';

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
  errorMessage = '';
  profilChoisi!: Profil;
  profils!: Profil[];
  submitted = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private profilService: ProfilService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      msisdn: ['', Validators.required],
      profil: ['', Validators.required]
    })


    this.getProfils();
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

  getProfils() {
    this.profilService.getAllProfils().subscribe (
      data => {
        this.profils = data;
      }
    )
  }

  getProfilChoisi(p: Profil) {
    this.profilChoisi = p;
  }

  onSubmit(): void {
    this.submitted = true
    const newUser = new User();
    newUser.firstName = this.f['firstName'].value
    newUser.lastName = this.f['lastName'].value
    newUser.email = this.f['email'].value
    newUser.msisdn = this.f['msisdn'].value
    newUser.profil = this.profilChoisi.id
    console.log(newUser)
    this.authService.registration(newUser).subscribe (
      {
        next: data => {
          this.isSuccessful = true;
          console.log(data)
      console.log(this.isSuccessful)
        },   error: err => {
          this.errorMessage = err.error.message;
          console.log("fffffffffffffffffffffff")
          console.log(err.error)
        }

      }
    )
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
