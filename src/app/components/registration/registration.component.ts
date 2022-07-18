
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User, Profil, Entite } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { EntiteService } from 'src/app/service/entite.service';
import { ProfilService } from 'src/app/service/profil.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm!: UntypedFormGroup;

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
  entiteChoisi!: Entite;
  entites!: Entite[];

  constructor(
    private authService: AuthService, 
    private formBuilder: UntypedFormBuilder, 
    private profilService: ProfilService,
    private entiteService: EntiteService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      msisdn: [''],
      code: [''],
      profil: ['', Validators.required],
      entite: [''],
    })


    this.getProfils();

    this.getEntites();
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

  
  get entite() {
    return this.registerForm.get('entite');
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

  getEntites() {
    this.entiteService.getAllEntites().subscribe(
      data => {
        this.entites = data
        console.log(this.entites)
      }
    )
  }

  getProfilChoisi(p: Profil) {
    this.profilChoisi = p;
    console.log(this.profilChoisi.code)
  }

  getEntiteChoisi(e: Entite) {
    this.entiteChoisi = e;
  }

  onSubmit(): void {
    this.submitted = true
    const newUser = new User();
    newUser.firstName = this.f['firstName'].value
    newUser.lastName = this.f['lastName'].value
    newUser.email = this.f['email'].value
    newUser.msisdn = this.f['msisdn'].value
    newUser.code = this.f['code'].value
    newUser.profil = this.profilChoisi.id
    newUser.entite = this.entiteChoisi?.id
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
