import {Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import * as Chartist from 'chartist';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';

export interface LegendItem {
  title: string;
  imageClass: string;
}

/**export enum ChartType {
  Pie,
  Line,
  Bar
}**/

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  userId: any;
  user: User = new User;
  
  partnerId: any;
  transactions: any = [];
  i: any
  status = ['SUCCESS', 'INITIATED']
  list: Array<number> = []
  constructor(private transactionService: TransactionService, private tokenStorage: TokenStorageService, private userServ: UserService) {
  }

  public ngOnInit(): void {

    this.userId = this.tokenStorage.getUser();
    console.log(this.userId)
    this.userServ.getUserById(this.userId.id).subscribe(
      data => {
        this.user = data
        console.log(this.user)
        console.log(this.user.msisdn)
        for(this.i in [0,1]) {
          this.transactionService.getTransactionsByPartnerIdAndStatus(this.user.msisdn, this.status[this.i]).subscribe(
            data => {
    this.transactions = data
    console.log(this.transactions)
    this.list.push(this.transactions.length)
   
    console.log(this.list)
    
            }
          )
          
        }
      /**   this.transactionService.getTransactionsByPartnerId(this.user.msisdn).subscribe(
          data => {
            this.transactions = data;
            console.log(this.transactions)
          }
        )*/
      }


    )


    this.getList()
    

  }

  data2 = new Chartist.Bar('.ct-chart', {
    labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    series: [20, 60, 120, 200, 180, 20, 10]
  }, {
    distributeSeries: true
  });
  


  type1: ChartType = 'Pie'
  data1: IChartistData = {
    
    labels: this.status,

    series:
   
      [this.list]
  }
  
  getList() {
    console.log(this.list)
  }

  type: ChartType = 'Bar';
  data: IChartistData = {
  
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8]
    ]
  };

  options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 300
  };
  

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
/**  static currentId = 1;

  @Input()
  public title!: string;

  @Input()
  public subtitle!: string;

  @Input()
  public chartClass!: string;

  @Input()
  public chartType!: ChartType;

  @Input()
  public chartData: any;

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive!: any[];

  @Input()
  public footerIconClass!: string;

  @Input()
  public footerText!: string;

  @Input()
  public legendItems!: LegendItem[];

  @Input()
  public withHr!: boolean;

  public chartId!: string;

  constructor() {
  }

  public ngOnInit(): void {
    this.chartId = `lbd-chart-${ChartComponent.currentId++}`;
  }

  public ngAfterViewInit(): void {

    switch (this.chartType) {
      case ChartType.Pie:
        new Chartist.Pie(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Line:
        new Chartist.Line(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Bar:
        new Chartist.Bar(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
    }
  } */

}
