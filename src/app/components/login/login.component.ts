import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profil: any;


  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]})

  }
  
  loginForm!: FormGroup;
  isLoggedIn = false
  errorMessage = '';
  submitted = false;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
  
    this.submitted = true;
    this.authService.login(this.f['email'].value, this.f['password'].value).subscribe ({

      next: data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        //this.reloadPage();
        this.authService.loggedIn.next(true)        
        this.router.navigate(['/transactions'])
    console.log(this.isLoggedIn)
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
    
  }

  reloadPage(): void {
    window.location.reload();
  }

}
