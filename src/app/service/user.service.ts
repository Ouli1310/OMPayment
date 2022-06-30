import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profil } from '../model/user';

 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl+'/user/'+id);

  }

  getUserPinCode(id: any): Observable<any> {
    return this.http.get<number>(environment.apiUrl+'/user/pinCode/'+id);
  } 

  getIdByIdType(id: any, idType: any): Observable<any> {
    return this.http.get<string>(environment.apiUrl+"/user/"+id+"/"+idType);
  }

}


