import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as Chartist from 'chartist';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { Label, ThemeService } from 'ng2-charts';
import { Transaction } from 'src/app/model/transactionRequest';
import { Entite, User } from 'src/app/model/user';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';
import { DatePipe } from '@angular/common';
import { EntiteService } from 'src/app/service/entite.service';
import { Observable, startWith, map } from 'rxjs';
export interface LegendItem {
  title: string;
  imageClass: string;
}

export interface data5 {
	[key: string]: any;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, data5 {

  userId: any;
  user: User = new User;
  pipe = new DatePipe('en-US');
  partnerId: string = "";
  transactions: Transaction[] = [];
  allTransactions: any = []
  i: any
  status = ['SUCCESS', 'INITIATED']
  list: Array<number> = []
  listSucces: Array<any> = []
  listInit: Array<any> = []
  numbers: Array<any> = []
  data1!: IChartistData;
  data2!: IChartistData;
  profil!: string;
  user1: User = new User();
  range!: FormGroup
  sommeTotale: number = 0
  entites: Entite[] = []
  myControl = new FormControl('');
  filteredOptions!: Observable<Entite[]>;
  msisdn!: String
  
  constructor(
    private transactionService: TransactionService, 
    private tokenStorage: TokenStorageService, 
    private userServ: UserService, 
    private profilService: ProfilService,
    private entiteService: EntiteService
    ) {
  }

  public ngOnInit(): void {
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')),
    )

  this.range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

    this.userId = this.tokenStorage.getUser();
    console.log(this.userId)
    this.userServ.getUserById(this.userId.id).subscribe(
      data => {
        this.user = data
        console.log(this.user)
        console.log(this.user.msisdn)
        this.chartOr(this.user);
        this.getTransactions(this.user)

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

  private _filter(value: string): Entite[] {
    console.log(this.entites)
    const filterValue = value.toLowerCase();
//console.log("this datasource",   this.getTransactions(this.user1))
    return this.entites.filter(option => option.msisdn.toLowerCase().includes(filterValue));
  }

  chartOr(user: User) {
    console.log("userrrrrr", this.user)
    this.profilService.getProfilById(this.user.profil).subscribe(data => {
      console.log(data)
      this.profil = data.code;
      console.log(this.profil)
      if (this.profil == 'AD') {
        this.transactionService.getTransactionsByStatus(this.status[0]).subscribe(
          data => {
            this.listSucces.length = data.length
            this.transactionService.getTransactionsByStatus(this.status[1]).subscribe(
              data => {

                this.listInit.length = data.length
                console.log(this.listSucces.length)
                console.log(this.listInit.length)
                this.data1 = {

                  labels: this.status,

                  series:

                    [[this.listSucces.length, this.listInit.length]]
                };

              }
            )
          })
         
      } else if(this.profil == 'CA') {
        this.transactionService.getTransactionsByEntiteAndStatus(this.user.entite, this.status[0]).subscribe(
          data => {
            this.listSucces.length = data.length
            this.transactionService.getTransactionsByEntiteAndStatus(this.user.entite, this.status[1]).subscribe(
              data => {
                this.listInit.length = data.length
                this.data1 = {

                  labels: this.status,

                  series:

                    [[this.listSucces.length, this.listInit.length]]
                };

              }
            )
          }
        )
      }
      else {
        this.userServ.getUserById(this.user.id).subscribe(
          data => {
            console.log("currentUser", data)
            this.user1 = data
            this.transactionService.getTransactionsByAgentAndStatus(this.user1.email, this.status[0]).subscribe(
              data => {
                this.listSucces.length = data.length
                this.transactionService.getTransactionsByAgentAndStatus(this.user1.email, this.status[1]).subscribe(
                  data => {
                    this.listInit.length = data.length
                    console.log(this.listSucces.length)
                    console.log(this.listInit.length)
                    this.data1 = {

                      labels: this.status,

                      series:

                        [[this.listSucces.length, this.listInit.length]],
                      
                    };

                  }
                )
              })
          })
      }


    }
    )

  }




  getTransactions(user: User) {
    console.log("userrrrrr", this.user)
    this.profilService.getProfilById(this.user.profil).subscribe(data => {
      console.log(data)
      this.profil = data.code;
      console.log(this.profil)
      if (this.profil == 'AD') {

        this.transactionService.getAllTransactions().subscribe(
          data => {
            this.transactions = data;
            console.log(this.transactions)
            for(let i = 0; i<this.transactions.length; i++) {
              this.sommeTotale += this.transactions[i].value
              
            }
            console.log(this.sommeTotale)
            console.log("liistTransactons", this.transactions)
            let labels: Date[] = []
            let series: number[] = []
            this.transactions.forEach(transaction => {
              if (transaction.date != null && transaction.value != null) {
                let formatDate = this.pipe.transform(transaction.date, 'dd/MM/yy')
                labels.push(transaction.date)
                series.push(transaction.value)
              }

            })
            console.log("lables", labels)
            console.log("series", series)
            this.data2 = {
              labels: labels,
              series: [series]
            }
          }
        )
      } else if(this.profil == 'CA') {
        this.transactionService.getTransactionsByEntite(this.user.entite).subscribe (
          data => {
            this.transactions = data
            for(let i = 0; i<this.transactions.length; i++) {
              this.sommeTotale += this.transactions[i].value
              
            }
            let labels: Date[] = []
            let series: number[] = []
            this.transactions.forEach(transaction => {
              if (transaction.date != null && transaction.value != null) {
                let formatDate = this.pipe.transform(transaction.date, 'dd/MM/yy')
                labels.push(transaction.date)
                series.push(transaction.value)
              }

            })
            this.data2 = {
              labels: labels,
              series: [series]
            }
          }
        )
      }
      
      else {
        this.userServ.getUserById(this.user.id).subscribe(
          data => {
            console.log("currentUser", data)
            this.user1 = data
            this.transactionService.getTransactionsByAgent(this.user1.email).subscribe(
              data => {
                this.transactions = data;
                console.log(this.transactions)
                for(let i = 0; i<this.transactions.length; i++) {
                  this.sommeTotale += this.transactions[i].value
                  
                }

                let labels: Date[] = []
                let series: number[] = []
                this.transactions.forEach(transaction => {
                  labels.push(transaction.date)
                  series.push(transaction.value)
                })
                this.data2 = {
                  labels: labels,
                  series: [series]
                }
              }
            )
          })
      }


    })



  }


  type1: ChartType = 'Line';




  type: ChartType = 'Bar';


  options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 300
  };

  optionsLine: Chartist.ILineChartOptions = {
    axisX: {
      showLabel: false,
    },
  }


  events: ChartEvent = {
    draw: (data1) => {
      if (data1.type === 'bar') {
        data1.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data1.y1,
            to: data1.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };

  getNumbChoisi(p: string) {
    this.partnerId = p
    console.log(this.partnerId)
    this.transactionService.getTransactionsByPartnerId(this.partnerId).subscribe(
      data => {
        this.transactions = data
        this.sommeTotale = 0
        for(let i = 0; i<this.transactions.length; i++) {
          this.sommeTotale += this.transactions[i].value }
          let labels: Date[] = []
          let series: number[] = []
          this.transactions.forEach(transaction => {
            labels.push(transaction.date)
            series.push(transaction.value)
          })
          this.data2 = {
            labels: labels,
            series: [series]
          }
          this.transactionService.getTransactionsByPartnerIdAndStatus(this.partnerId, this.status[0]).subscribe(

            data => {
              console.log(this.partnerId)
              this.listSucces = data
              console.log("liste succes", this.listSucces)
              console.log(this.listSucces.length)
      
            })
      
          this.transactionService.getTransactionsByPartnerIdAndStatus(this.partnerId, this.status[1]).subscribe(
      
            data => {
              console.log(this.partnerId)
              this.listInit = data
              console.log("liste init", this.listInit)
              console.log(this.listInit.length)
      
      
              this.data1 = {
      
                labels: this.status,
      
                series:
      
                  [[this.listSucces.length, this.listInit.length]]
              };

              
      
      
      
      
            })
        }
      
     
    )

    
  }





  @Input()
  control!: FormControl;


}

