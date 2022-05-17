import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  url!: any;
  homeUrl!: any;
  loginUrl!: any;
  registerUrl!: any;

  ngOnInit(): void {
    this.url = window.location.pathname;
    console.log(this.url)
    this.loginUrl = environment.loginUrl;
    console.log(this.loginUrl)
    this.homeUrl = environment.homeUrl;
    console.log(this.homeUrl)
    this.registerUrl = environment.registerUrl;
  }

  login() {
    this.router.navigate(['/login'])
  }

  register() {
    this.router.navigate(['register'])
  }

  
}
