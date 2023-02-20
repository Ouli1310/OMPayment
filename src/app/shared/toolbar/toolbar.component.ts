import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  
  user!: any;
  profil!: string;
  newToken!: any
  subscription!: Subscription;
  public isLogged$!: Observable<boolean>;
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private transactionService: TransactionService,
    private dataServ: DataService,
    ) { }
  
  ngOnInit(): void {
    this.isLogged$ = this.authService.isLoggedIn
    this.subscription = this.dataServ.currentProfil.subscribe(profil => {
      this.profil = profil
      console.log('profil from toolbar ', this.profil)
    })
   
  }


  login() {
    console.log('test')
    this.router.navigate(['/login'])
    
  }

  register() {
    this.router.navigate(['register'])
  }

  logout() {
    this.tokenStorage.signout()
    this.authService.loggedIn.next(false)
    this.router.navigate([''])
  }

  chart() {
    this.router.navigate(['/chart'])
  }

  chartSynthese() {
    this.router.navigate(['/chart-synthese'])
  }

  profilPage() {
    this.transactionService.newTokenTransaction(this.user.id).subscribe(
      data => {
        this.newToken = data
        console.log(this.newToken)
    this.router.navigate(['/profil'])
      })
  }

  showPage() {
    if(!this.isLogged$) {
      this.router.navigate(["/home"])
    }
    
  }


  ngOnDestroy() {
   // this.subscription.unsubscribe()
  }

  

  
}
