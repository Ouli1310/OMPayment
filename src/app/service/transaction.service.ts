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

getTransactionsByEntite(entite: number): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/entite/'+entite);
}

getTransactionsByEntiteAndStatus(entite: number, status: string): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/entite/'+entite+'/'+status);
}

getTransactionsByAgent(email: string): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/agent/'+email);
}

getTransactionsByAgentAndStatus(email: string, status: string): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/agent/'+email+'/'+status);
}

getTransactionBetween2Dates(date1: any, date2: any): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/dates/'+date1+'/'+date2);
}

getTransactionByEntiteAndBetween2Dates(entite: number, date1: any, date2: any): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/entite/'+entite+'/dates/'+date1+'/'+date2);
}


getAllMethod(): Observable<any> {
  return this.http.get(environment.apiUrl+"/transaction/method");
}

getAllIdType(): Observable<any> {
  return this.http.get(environment.apiUrl+"/transaction/idType");
}

getTransactionsByMethode(methode: string): Observable<any> {
  return this.http.get(environment.apiUrl+'/transaction/method/'+methode);
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

getProfile(id: any, msisdn: any): Observable<any> {
  return this.http.get<any>(environment.apiUrl+'/transaction/getProfile/'+id+'?msisdn='+msisdn+'&type=retailer')
}

}
