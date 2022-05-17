import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
//import { stringify } from 'querystring';
import { environment } from 'src/environments/environment';
import { Profil, User } from '../model/user';
import { TokenStorageService } from './token-storage.service';
//import { env } from 'process';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl+'/auth/signin', {
      email,
      password
    }, httpOptions)
  }

  register(firstName: string, lastName: string, email: string, msisdn: number, password: string, profil: number): Observable<any> {
    return this.http.post(environment.apiUrl+'/auth/signup', {
      firstName,
      lastName,
      email,
      msisdn,
      password,
      profil,
    }, httpOptions);
  }

  registration(data: User): Observable<any>{
    console.log("user from registration", data)
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, data, httpOptions);
  } 

  isLogged(): boolean {
    if(this.tokenService.getToken() == null) {
      return false;
    }
    return true;
  }
   
}
