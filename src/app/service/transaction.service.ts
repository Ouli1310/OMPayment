import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../model/transactionRequest';
import { AuthInterceptor } from '../_helpers/auth.interceptor';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    
 })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  token = this.tokenService.getToken();

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(environment.apiUrl+'/transaction');
}

getTransactionsByStatus(status: String): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/'+status);
}

getTransactionsByPartnerId(partnerId: string): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/partner/'+partnerId);
}

getTransactionsByPartnerIdAndStatus(partnerId: string, status: string): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/partner/'+partnerId+"/"+status);
}


getAllMethod(): Observable<any> {
  return this.http.get(environment.apiUrl+"/transaction/method");
}

getAllIdType(): Observable<any> {
  return this.http.get(environment.apiUrl+"/transaction/idType");
}

newTokenTransaction(id: any): Observable<any> {
  return this.http.post(environment.apiUrl+'/transaction/newToken/'+id, null, {responseType: 'text'});
}

initTransasction(id: any, data: any): Observable<any> {
  return this.http.post<any>(environment.apiUrl+'/transaction/initTransaction/'+id, data);
}

oneStepPayment(id: any, data: any): Observable<any> {
  return this.http.post<any>(environment.apiUrl+'/transaction/oneStepPayment/'+id, data);
}

}
