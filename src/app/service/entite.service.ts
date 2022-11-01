import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntiteService {

  constructor(private http: HttpClient) { }

  getAllEntites(): Observable<any> {
    return this.http.get(environment.apiUrl+'/entite');
  }

  getEntiteById(id: number): Observable<any> {
    return this.http.get(environment.apiUrl+'/entite/'+id);
  }

  getEntiteByName(name: string): Observable<any> {
    return this.http.get(environment.apiUrl+'/entite/name/'+name);
  }
}
