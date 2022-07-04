
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 'RE'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 'RE'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 'EC'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 'EC'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 'EH'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status: 'EH'}
]; 

@Component({
  selector: 'app-liste-transaction',
  templateUrl: './liste-transaction.component.html',
  styleUrls: ['./liste-transaction.component.css']
})
export class ListeTransactionComponent implements OnInit {

  isNewTransaction!: boolean
  displayedColumns: string[] = ['id', 'transactionId', 'requestId', 'reference', 'partner', 'customer', 'date', 'valeur', 'status'];
  dataSource = ELEMENT_DATA;

  user: any;
  user1: User = new User();
  transactions: any;
  newToken!: any;
  transacReu : any;
  status!: string;
  pg!: MatPaginator
  constructor(private transactionService: TransactionService, private tokenStorage: TokenStorageService, private router: Router, private userService : UserService) { }
  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.pg = paginator
  } ;
 

  ngOnInit(): void {
    

    if (this.transactions) {
      this.transactions.paginator = this.pg;
  }


   if(this.tokenStorage.getToken() == null) {
    console.error("No token");
    this.router.navigate([''])
     
   }
    this.isNewTransaction = false
    this.user = this.tokenStorage.getUser();
    console.log(this.user)
    this.userService.getUserById(this.user.id).subscribe(
      data => {
        this.user1 = data
        console.log(this.user1)
      }
    )

    this.getTransactions()
    

  }

  getTransactions() {
    this.transactionService.getAllTransactions().subscribe (
      data => {
        this.transactions = data;
        console.log(this.transactions)
      }
    )
  }


  NewTransactionOrList(): boolean {
    this.isNewTransaction = !this.isNewTransaction
    return this.isNewTransaction
  }

  transactionsByStatus(status: String) {
    this.transactionService.getTransactionsByStatus(status).subscribe (
      data => {
        this.transactions = data
    })
  }

  getNewTokenTransaction() {

    this.transactionService.newTokenTransaction(this.user1.id).subscribe(
      data => {
        this.newToken = data
        console.log(this.newToken)
      }
    )

   
  }

  getTransactionsRéussies() {
      this.transactionService.getTransactionsByStatus("SUCCESS").subscribe(
        data => {
this.transacReu = data;
console.log(this.transacReu)
        }
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.transactions.filter = filterValue.trim().toLowerCase();
}

  
}
