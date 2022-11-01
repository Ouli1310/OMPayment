import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../model/transactionRequest';

@Injectable({
  providedIn: 'root'
})
export class CashInService {

  constructor(
    private http: HttpClient
  ) { }


  initCashIn(id: any, data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl+'/cashIn/initCashIn/'+id, data);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(environment.apiUrl+'/cashIn');
}

}
