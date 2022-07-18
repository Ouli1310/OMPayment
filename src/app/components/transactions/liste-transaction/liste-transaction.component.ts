
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { Profil, User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/model/transactionRequest';
import * as XLSX from 'xlsx';
import { MatSort } from '@angular/material/sort';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ProfilService } from 'src/app/service/profil.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 'RE' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 'RE' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 'EC' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 'EC' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 'EH' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status: 'EH' }
];

@Component({
  selector: 'app-liste-transaction',
  templateUrl: './liste-transaction.component.html',
  styleUrls: ['./liste-transaction.component.css']
})
export class ListeTransactionComponent implements OnInit, AfterViewInit {

  isNewTransaction!: boolean
  displayedColumns: string[] = ['id', 'transactionId', 'requestId', 'reference', 'partnerId', 'customerId', 'date', 'valeur', 'status'];


  user: any;
  user1: User = new User();
  newToken!: any;
  transacReu: any;
  status!: string;
  partnerId!: string;
  partner: string = '';
  pg!: MatPaginator
  list1: any;
  dates: any;
  profil!: string;
  myControl = new FormControl('');
  filteredOptions!: Observable<Transaction[]>;
  public isLogged$!: Observable<boolean>;
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  transactions: Transaction[] = [];
  fileName= 'ExcelSheet.xlsx';
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private transactionService: TransactionService, private tokenStorage: TokenStorageService, private router: Router, private userService: UserService, private authService: AuthService, private profilService: ProfilService) { }
  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.pg = paginator
  };


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.isLogged$ = this.authService.isLoggedIn
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


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
        console.log("userrrrrrrrrrrrr111111111111", this.user1)
        
   
      }
    
    )
    this.getTransactions(this.user1)



  }

  getTransactions(user: User) {
    console.log("userrrrrr", this.user)
    this.profilService.getProfilById(this.user.profil).subscribe( data => {
      console.log(data)
      this.profil = data.code;
      console.log(this.profil)
      if(this.profil == 'AD') {
     
        this.transactionService.getAllTransactions().subscribe(
          data => {
            this.transactions = data;
            this.dataSource = new MatTableDataSource(data)
            console.log('datasource', this.dataSource.data)
            
          }
        )
      } else {
        this.userService.getUserById(this.user.id).subscribe(
          data => {
            console.log("currentUser", data)
            this.user1 = data
        this.transactionService.getTransactionsByPartnerId(this.user1.msisdn).subscribe(
          data => {
            this.transactions = data;
            
   
            this.dataSource = new MatTableDataSource(data)
            console.log('datasource', this.dataSource.data)
            
          }
          
        )})
        
      }
      
    })
  
  
  
   
  }

  private _filter(value: string): Transaction[] {
  
    const filterValue = value.toLowerCase();
console.log("this datasource",   this.getTransactions(this.user1))
    return this.transactions.filter(option => option.partnerId.toLowerCase().includes(filterValue));
  }



  NewTransactionOrList(): boolean {
    this.isNewTransaction = !this.isNewTransaction
    return this.isNewTransaction
  }

  transactionsByStatus(status: String) {
    this.transactionService.getTransactionsByStatus(status).subscribe(
      data => {
        this.transactions = data
      })
  }

  getNewTokenTransaction() {

    this.transactionService.newTokenTransaction(this.user1.id).subscribe(
      data => {
        this.newToken = data
        console.log(this.newToken)
        this.router.navigate(['transactions/add-transaction'])
      }
    )


  }

  getNumbChoisi(p: string) {
    this.partnerId = p
    console.log("current partner idw", this.partnerId)
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
  applyFilterByStatus(stat: string) {
    console.log('get status ', stat)
    let sta = stat.trim()
    sta = sta.toLowerCase()
    this.dataSource.filter = sta
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('table');
    
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }


}

