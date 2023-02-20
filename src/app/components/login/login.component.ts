import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-message-popup',
  template: `
    <h1 mat-dialog-title>Error</h1>
    <div mat-dialog-content>
      {{data.message}}
    </div>
    <div mat-dialog-actions style="margin-top: 20px;">
  <button mat-button mat-dialog-close style="margin-right: 20px;"> No </button>
  <button mat-button mat-dialog-close cdkFocusInitial> Ok </button>
</div>
  `
})

export class ErrorMessagePopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorMessagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  profil!: string;
  subscription!: Subscription

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private userServ: UserService,
    public dialog: MatDialog,
    public dataServ: DataService,
    private profilServ: ProfilService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]})
      this.subscription = this.dataServ.currentProfil.subscribe(profil => this.profil = profil)
      console.log( 'profiol from login', this.profil)
  }
  
  loginForm!: UntypedFormGroup;
  isLoggedIn!: boolean
  errorMessage = '';
  submitted!: boolean

  openModal(errorMessage: string) {
    this.errorMessage = errorMessage;
    console.log(this.errorMessage)
   
    this.dialog.open(ErrorMessagePopupComponent, {
      width: '250px',
      data: {message: this.errorMessage}
     
    });
  }
  

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
             // console.log(data)
              this.tokenStorageService.saveToken(data.token);
              this.tokenStorageService.saveUser(data);
              //this.reloadPage();
              this.authService.loggedIn.next(true) 
                
              this.profilServ.getProfilById(data.profil).subscribe( data => {
               // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa", data)
               this.profil = data.code
               this.dataServ.changeProfil(data.code) 
                console.log('Profil from login',this.profil)

              })
              this.router.navigate(['/transactions'])
          //console.log(this.isLoggedIn)
            },
            error: err => {
              this.authService.loggedIn.next(false)
             // console.log(err)
             // console.log(err.error.text)
              this.errorMessage = err.error.text;
              this.openModal(this.errorMessage)
            }
          });
       
          
        
        }
    
  /*reloadPage(): void {
    window.location.reload();
  }*/

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
