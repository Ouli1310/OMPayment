import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'}
]; 

@Component({
  selector: 'app-liste-transaction',
  templateUrl: './liste-transaction.component.html',
  styleUrls: ['./liste-transaction.component.css']
})
export class ListeTransactionComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  transactions: any;

  constructor(private transactionService: TransactionService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {

   if(this.tokenStorage.getToken() == null) {
    console.error("No token");
    this.router.navigate([''])
     
   }
  }

  getTransactions() {
    this.transactionService.getAllTransactions().subscribe (
      data => {
        this.transactions = data;
      }
    )
  }


}
