import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
//import { stringify } from 'querystring';
import { environment } from 'src/environments/environment';
import { Profil } from '../model/user';
//import { env } from 'process';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl+'/auth/signin', {
      email,
      password
    }, httpOptions)
  }

  register(firstName: string, lastName: string, email: string, msisdn: string, password: string, profil: number): Observable<any> {
    return this.http.post(environment.apiUrl+'/auth/signup', {
      firstName,
      lastName,
      email,
      msisdn,
      password,
      profil
    }, httpOptions);
  }

  registration<Type>(data: Type): Observable<Type>{
    return this.http.post<Type>(`${environment.apiUrl}/auth/signup`, data, httpOptions);
  } 
   
}
