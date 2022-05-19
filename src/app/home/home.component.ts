import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public isLogged$!: Observable<boolean>;
  constructor(
    private router: Router,
    private logoutService: TokenStorageService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.isLogged$ = this.authService.isLoggedIn
  }

  login() {
    this.router.navigate(['/login'])
  }

  register() {
    this.router.navigate(['register'])
  }

  logout() {
    this.logoutService.signout()
    this.authService.loggedIn.next(false)
    this.router.navigate([''])
  }
  
}
