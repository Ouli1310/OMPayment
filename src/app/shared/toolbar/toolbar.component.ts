import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  user!: any;
  profil!: any;
  public isLogged$!: Observable<boolean>;
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private profilService: ProfilService
    ) { }

  ngOnInit(): void {
    this.isLogged$ = this.authService.isLoggedIn
    this.user = this.tokenStorage.getUser();
    console.log(this.user)
    this.profilService.getProfilById(this.user.profil).subscribe( data => {
      console.log(data)
      this.profil = data.code;
      console.log(this.profil)
    })
    
  }


  login() {
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

  profilPage() {
    this.router.navigate(['/profil'])
  }

  showPage() {
    if(!this.isLogged$) {
      this.router.navigate(["/home"])
    }
    
  }


  
}
