import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/model/transactionRequest';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { CashInService } from 'src/app/service/cash-in.service';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-liste-cash-ins',
  templateUrl: './liste-cash-ins.component.html',
  styleUrls: ['./liste-cash-ins.component.css']
})
export class ListeCashInsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'transactionId', 'requestId', 'reference', 'partnerId', 'customerId', 'date', 'valeur', 'status'];

  transactions: Transaction[] = []
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  isNewTransaction!: boolean;
  user!: User
  user1: User = new User()
  newToken: any
  public isLogged$!: Observable<boolean>;

  constructor(
    private cashInService: CashInService,
    private tokenStorage: TokenStorageService, 
    private router: Router, 
    private transactionService: TransactionService,
    private userService: UserService, 
    private authService: AuthService, 
    private profilService: ProfilService,
  ) { }

  ngOnInit(): void {

    this.isLogged$ = this.authService.isLoggedIn

    if (this.tokenStorage.getToken() == null) {
      console.error("No token");
      this.router.navigate([''])

    }
    this.isNewTransaction = false
    this.user = this.tokenStorage.getUser();
    console.log(this.user)
    this.userService.getUserById(this.user.id).subscribe(
      data => {
        this.user1 = data
      })
    this.getTransactions()

  }


  getTransactions() {
   
            this.cashInService.getAllTransactions().subscribe(
              data => {
               
                    this.transactions = data
                    console.log('transactions', this.dataSource.data)
                    this.dataSource = new MatTableDataSource(data)
                    console.log('datasource', this.dataSource.data)
                  }
            )

                }


                NewTransactionOrList(): boolean {
                  this.isNewTransaction = !this.isNewTransaction
                  return this.isNewTransaction
                }

                getNewTokenTransaction() {

                  this.transactionService.newTokenTransaction(this.user1.id).subscribe(
                    data => {
                      this.newToken = data
                      console.log(this.newToken)
                      this.router.navigate(['cashIn/add-cashIn'])
                    }
                  )
              
              
                }
            
              
              
                applyFilter(event: Event) {
                  let filterValue = (event.target as HTMLInputElement).value;
                  // this.transactions.data.filter = filterValue.trim().toLowerCase();
                  console.log('show value', filterValue)
              
                  filterValue = filterValue.trim(); // Remove whitespace
                  filterValue = filterValue.toLowerCase()
                  this.dataSource.filter = filterValue
              
                  console.log('after filter ', this.dataSource.data)
                  if (this.dataSource.paginator) {
                    this.dataSource.paginator.firstPage();
                  }
                }
              

}
