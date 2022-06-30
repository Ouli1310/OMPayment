import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
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

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  
}
