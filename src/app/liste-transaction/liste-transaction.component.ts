import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';


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

  isNewTransaction!: boolean
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  transactions: any;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.isNewTransaction = false
  }

  getTransactions() {
    this.transactionService.getAllTransactions().subscribe (
      data => {
        this.transactions = data;
      }
    )
  }

  NewTransactionOrList(): boolean {
    this.isNewTransaction = !this.isNewTransaction
    return this.isNewTransaction
  }
}
