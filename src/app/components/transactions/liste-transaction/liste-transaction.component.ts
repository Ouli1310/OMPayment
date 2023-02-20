
import { Component, Input, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { Entite, Profil, User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/model/transactionRequest';
import * as XLSX from 'xlsx';
import { MatSort } from '@angular/material/sort';
import { map, Observable, startWith, Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ProfilService } from 'src/app/service/profil.service';
import { EntiteService } from 'src/app/service/entite.service';
import { DataService } from 'src/app/service/data.service';



@Component({
  selector: 'app-liste-transaction',
  templateUrl: './liste-transaction.component.html',
  styleUrls: ['./liste-transaction.component.css']
})
export class ListeTransactionComponent implements OnInit, AfterViewInit, OnDestroy {

  isNewTransaction!: boolean
  displayedColumns: string[] = ['id', 'transactionId', 'requestId', 'reference', 'partnerId', 'customerId', 'date', 'valeur', 'status'];


  user: any;
  user1: User = new User();
  newToken!: any;
  transacReu: any;
  status!: string;
  msisdn!: string;
  partner: string = '';
  pg!: MatPaginator
  list1: any;
  dates: any;
  profil!: string;
  myControl = new FormControl('');
  filteredOptions!: Observable<Entite[]>;
  filteredNames!: Observable<User[]>;
  public isLogged$!: Observable<boolean>;
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  transactions: Transaction[] = [];
  fileName= 'ExcelSheet.xlsx';
  entites: Entite[] = [];
  usersEntite: User[] = []
  email!: string;
  firstName!: string
  user2: User = new User();
  entite: Entite = new Entite()
  subscription!: Subscription;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private transactionService: TransactionService, 
    private tokenStorage: TokenStorageService, 
    private router: Router, 
    private userService: UserService, 
    private authService: AuthService, 
    private profilService: ProfilService,
    private entiteService: EntiteService,
    private dataServ: DataService
    ) { }
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

    this.filteredNames = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );



    if (this.tokenStorage.getToken() == null) {
      console.error("No token");
      this.router.navigate([''])

    }
    this.isNewTransaction = false
    this.user = this.tokenStorage.getUser();
    //console.log(this.user)
    this.userService.getUserById(this.user.id).subscribe(
      data => {
        this.user1 = data
      this.getUsersEntite(this.user1)
        
      //  console.log("USER 1", this.user1)
        this.getTransactions(this.user1)
      }
    
    )
   

      this.getEntites()

  }

  getEntites() {
    this.entiteService.getAllEntites().subscribe(
      data => {
        this.entites = data
      }
    )
  }

  getUsersEntite(user: User) {
    //console.log(user)
   
    this.userService.getUsersByEntite(user.entite).subscribe(
      data => {
        this.usersEntite = data
        //console.log("USERS ENTTE", this.usersEntite)
      }
    )
    
  }

  getTransactions(user: User) {
    this.subscription = this.dataServ.currentProfil.subscribe(profil => {
      this.profil = profil
      console.warn('profil transaction', this.profil)
    })
    if(this.profil == 'AD' || this.profil == 'DAF') {
      this.transactionService.getTransactionsByMethode("CASHIN").subscribe(
        data => {
         
              this.transactions = data
              this.dataSource = new MatTableDataSource(data)
            }
      )}   else if(this.profil == 'CA') {
        this.userService.getUserById(this.user.id).subscribe(
          data => {
            console.log("currentUser", data)
            this.user1 = data
        this.transactionService.getTransactionsByEntite(this.user1.entite).subscribe(
          data => {
            this.transactions = data;
            this.dataSource = new MatTableDataSource(data)
            console.log('datasource', this.dataSource.data)
          }
        )}
        ) 

      }else
        {
        this.userService.getUserById(this.user.id).subscribe(
          data => {
            console.log("currentUser", data)
            this.user1 = data
        this.transactionService.getTransactionsByAgent(this.user1.email).subscribe(
          data => {
            this.transactions = data;
            console.log("transactons", this.transactions)
            this.dataSource = new MatTableDataSource(data)
            console.log('datasource', this.dataSource.data)
            
          }
          
        )})   
      } 
  }
  
/*
  getTransactions(user: User) {
  //  console.log("userrrrrr", this.user)
    this.profilService.getProfilById(this.user.profil).subscribe( data => {
     // console.log(data)
      this.profil = data.code;
     // this.dataServ.changeProfil(data.code)
      console.log('profiiiiil from transactions', this.profil)
     
          if(this.profil == 'AD' || this.profil == 'DAF') {
            console.log("AAAAAAAAAAAA")
     
            this.transactionService.getTransactionsByMethode("CASHIN").subscribe(
              data => {
               
                    this.transactions = data
                    //console.log('transactions', this.dataSource.data)
                    this.dataSource = new MatTableDataSource(data)
                    //console.log('datasource', this.dataSource.data)
                  }
            )
               
               
                
              }
            
           else if(this.profil == 'CA') {
            this.userService.getUserById(this.user.id).subscribe(
              data => {
                console.log("currentUser", data)
                this.user1 = data
            this.transactionService.getTransactionsByEntite(this.user1.entite).subscribe(
              data => {
                this.transactions = data;
                this.dataSource = new MatTableDataSource(data)
                console.log('datasource', this.dataSource.data)
              }
            )}
            ) 
    
          }else
            {
            this.userService.getUserById(this.user.id).subscribe(
              data => {
                console.log("currentUser", data)
                this.user1 = data
            this.transactionService.getTransactionsByAgent(this.user1.email).subscribe(
              data => {
                this.transactions = data;
                console.log("transactons", this.transactions)
                this.dataSource = new MatTableDataSource(data)
                console.log('datasource', this.dataSource.data)
                
              }
              
            )})
            
          } 
          
        }) 
  }
*/
  private _filter1(value: string): User[] {
    console.log(this.usersEntite)
  
    const filterValue = value.toLowerCase();
//console.log("this datasource",   this.getTransactions(this.user1))
    return this.usersEntite.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }

  private _filter(value: string): Entite[] {
    console.log(this.entites)
    const filterValue = value.toLowerCase();
//console.log("this datasource",   this.getTransactions(this.user1))
    return this.entites.filter(option => option.msisdn.toLowerCase().includes(filterValue));
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
  
        this.msisdn = p
        console.log("current partner idw", this.msisdn)
     
  }

  getfirstNameChoisi(p: string) {
    this.firstName = p
    this.userService.getUserByFirstName(this.firstName).subscribe(
      data => {
        this.user2 = data
        this.email = this.user2.email
        console.log(this.email)
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

  ngOnDestroy() {
    //this.subscription.unsubscribe()
  }

}

