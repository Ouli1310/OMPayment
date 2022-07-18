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
import { User } from 'src/app/model/user';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';
import { DatePipe } from '@angular/common';
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
  constructor(private transactionService: TransactionService, private tokenStorage: TokenStorageService, private userServ: UserService, private profilService: ProfilService) {
  }

  public ngOnInit(): void {
    
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
      }
      else {
        this.userServ.getUserById(this.user.id).subscribe(
          data => {
            console.log("currentUser", data)
            this.user1 = data
            this.transactionService.getTransactionsByPartnerIdAndStatus(this.user1.msisdn, this.status[0]).subscribe(
              data => {
                this.listSucces.length = data.length
                this.transactionService.getTransactionsByPartnerIdAndStatus(this.user1.msisdn, this.status[1]).subscribe(
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
      } else {
        this.userServ.getUserById(this.user.id).subscribe(
          data => {
            console.log("currentUser", data)
            this.user1 = data
            this.transactionService.getTransactionsByPartnerId(this.user1.msisdn).subscribe(
              data => {
                this.transactions = data;
                console.log(this.transactions)
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





  @Input()
  control!: FormControl;

  chart: any;
	isButtonVisible = false;
 
	visitorsChartDrilldownHandler = (e: any) => {
		this.chart.options = this.visitorsDrilldownedChartOptions;	
		this.chart.options.data = this.options1[e.dataPoint.name];
		this.chart.options.title = { text: e.dataPoint.name }
		this.chart.render();
		this.isButtonVisible = true;
	}
 
	visitorsDrilldownedChartOptions = {
		animationEnabled: true,
		theme: "light2",
		axisY: {
			gridThickness: 0,
			lineThickness: 1
		},
		data: []
	};
 
	newVSReturningVisitorsOptions = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "New vs Returning Visitors"
		},
		subtitles: [{
			text: "Click on Any Segment to Drilldown",
			backgroundColor: "#2eacd1",
			fontSize: 16,
			fontColor: "white",
			padding: 5
		}],
		data: []
	};
 
	options1: data5 = {
		"New vs Returning Visitors": [{
			type: "pie",
			name: "New vs Returning Visitors",
			startAngle: 90,
			cursor: "pointer",
			explodeOnClick: false,
			showInLegend: true,
			legendMarkerType: "square",			
			click: this.visitorsChartDrilldownHandler,
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{ y: 551160, name: "New Visitors", color: "#058dc7", indexLabel: "62.56%" },
				{ y: 329840, name: "Returning Visitors", color: "#50b432", indexLabel: "37.44%" }
			]
		}],
		"New Visitors": [{
			color: "#058dc7",
			name: "New Visitors",
			type: "column",
			dataPoints: [
				{ label: "Jan", y: 42600 },
				{ label: "Feb", y: 44960 },
				{ label: "Mar", y: 46160 },
				{ label: "Apr", y: 48240 },
				{ label: "May", y: 48200 },
				{ label: "Jun", y: 49600 },
				{ label: "Jul", y: 51560 },
				{ label: "Aug", y: 49280 },
				{ label: "Sep", y: 46800 },
				{ label: "Oct", y: 57720 },
				{ label: "Nov", y: 59840 },
				{ label: "Dec", y: 54400 }
			]
		}],
		"Returning Visitors": [{
			color: "#50b432",
			name: "Returning Visitors",
			type: "column",
			dataPoints: [
				{ label: "Jan", y: 21800 },
				{ label: "Feb", y: 25040 },
				{ label: "Mar", y: 23840 },
				{ label: "Apr", y: 24760 },
				{ label: "May", y: 25800 },
				{ label: "Jun", y: 26400 },
				{ label: "Jul", y: 27440 },
				{ label: "Aug", y: 29720 },
				{ label: "Sep", y: 29200 },
				{ label: "Oct", y: 31280 },
				{ label: "Nov", y: 33160 },
				{ label: "Dec", y: 31400 }
			]
		}]
	};
 
	handleClick(event: Event) { 
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options1["New vs Returning Visitors"];
		this.chart.render(); 
		this.isButtonVisible = false;
	  } 	
	 
	getChartInstance(chart: object) {
		this.chart = chart;
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options1["New vs Returning Visitors"];
		this.chart.render();
	}

}

