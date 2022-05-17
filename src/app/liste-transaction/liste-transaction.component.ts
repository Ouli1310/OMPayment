import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-liste-transaction',
  templateUrl: './liste-transaction.component.html',
  styleUrls: ['./liste-transaction.component.css']
})
export class ListeTransactionComponent implements OnInit {
  transactions: any;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  getTransactions() {
    this.transactionService.getAllTransactions().subscribe (
      data => {
        this.transactions = data;
      }
    )
  }
}
