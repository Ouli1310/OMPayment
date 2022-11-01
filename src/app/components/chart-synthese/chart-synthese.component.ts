import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { throws } from 'assert';
import { sum } from 'chartist';
import { Transaction } from 'src/app/model/transactionRequest';
import { Profil, User } from 'src/app/model/user';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';


export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD-MM-YYYY',
    },
    display: {
      dateInput: 'DD-MM-YYYY',
      //monthYearLabel: 'MMMM YYYY',
      //dateA11yLabel: 'LL',
      //monthYearA11yLabel: 'MMMM YYYY'
    },
};

export interface data5 {
	[key: string]: any;
}


@Component({
  selector: 'app-chart-synthese',
  templateUrl: './chart-synthese.component.html',
  styleUrls: ['./chart-synthese.component.css'],
  providers: [
	{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})




export class ChartSyntheseComponent implements OnInit {

  range!: FormGroup;
  profil: Profil = new Profil();
  transactionEntite1!: Transaction[];
  transactionEntite2!: Transaction[];
  userId!: any;
  user!: User;
  options1!: data5;
  entitePercent1!: string;
  entitePercent2!: string;
  sumValue1!: number;
  sumValue2!: number;
  pipe = new DatePipe('en-US');
  range2: any;
  transactions: Transaction[] = []
  startDate!: Date
  endDate!: Date
  constructor(
	private userService: UserService, 
	private profilService: ProfilService, 
	private transactionService: TransactionService,
	private tokenStorage: TokenStorageService,
	private datePipe: DatePipe
	) { 
		
	}

  ngOnInit(): void {

	this.range = new FormGroup({
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null),
	  });

	this.userId = this.tokenStorage.getUser();
    console.log(this.userId)
    this.userService.getUserById(this.userId.id).subscribe(
      data => {
        this.user = data
        console.log(this.user)
        console.log(this.user.msisdn)
		this.getTransactionsByEntite(this.user)
      }
    )
  }

  get start() {
    return this.range.get('start');
  }

  
  get end() {
    return this.range.get('end');
  }

  get f() {
    return this.range.controls;
  }
 /** dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement)
  {
	console.log(dateRangeStart.valueAsDate);
	console.log(dateRangeEnd.valueAsDate);
	this.transactionService.getTransactionBetween2Dates(dateRangeStart.valueAsDate, dateRangeEnd.valueAsDate).subscribe(
			data => {
				this.transactions = data
				console.log(this.transactions)
			}
		)
	  }  */


	  onSubmit() {
		this.startDate = this.f['start'].value._d
		console.log("START", this.startDate)
		console.log(this.datePipe.transform(this.startDate,'YYYY-MM-dd'));
		
		
		this.endDate = this.f['end'].value._d
		console.log("END", this.endDate)
		console.log(this.datePipe.transform(this.endDate,'YYYY-MM-dd'));
		this.sumValue1 = 0
		this.sumValue2 = 0

		this.transactionService.getTransactionByEntiteAndBetween2Dates(1, this.datePipe.transform(this.startDate,'YYYY-MM-dd'), this.datePipe.transform(this.endDate,'YYYY-MM-dd')).subscribe(
			data => {
				this.transactionEntite1 = data
				console.log("TRANSACTONS", this.transactionEntite1)
				console.log("TRANSACTONS-length", this.transactionEntite1.length)
				for(let i = 0; i<this.transactionEntite1.length; i++) {
					console.log(",rnezlrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
					this.sumValue1 += this.transactionEntite1[i].value
					
				}
				console.log("SOMME DES VALUES DE 1", this.sumValue1)
				this.transactionService.getTransactionByEntiteAndBetween2Dates(2, this.datePipe.transform(this.startDate,'YYYY-MM-dd'), this.datePipe.transform(this.endDate,'YYYY-MM-dd')).subscribe(
					data => {
						this.transactionEntite2 = data
						console.log("TRANSACTONS", this.transactionEntite2)
						console.log("TRANSACTONS-length", this.transactionEntite2.length)
						for(let i = 0; i<this.transactionEntite2.length; i++) {
							this.sumValue2 += this.transactionEntite2[i].value
							
						}
						console.log("SOMME DES VALUES DE 2", this.sumValue2)
						
						this.entitePercent1 = ((this.sumValue1*100)/(this.sumValue1 + this.sumValue2)).toString()
						console.log("ENTTE PECENTAGE 1", this.entitePercent1)
						this.entitePercent2 = ((this.sumValue2*100)/(this.sumValue1 + this.sumValue2)).toString()
						console.log("ENTTE PECENTAGE 2", this.entitePercent2)
						var listDate1: { label: Date; y: number; }[] = [];
						var listDate2: { label: Date; y: number; }[] = [];
	
						this.transactionEntite1.forEach(function(d) {
							listDate1.push({
							 label: d.date,
							 y: d.value
						   });
						 });
						 
						 console.log("LIST", listDate1);
	
						 this.transactionEntite2.forEach(function(d) {
							listDate2.push({
							  label: d.date,
							  y: d.value
							});
						  });
						  
						  console.log("LIST", listDate2);
			
							this.options1 =  {
								"AGENCE 1 vs AGENCE 2": [{
									type: "pie",
									name: "AGENCE 1 vs AGENCE 2",
									startAngle: 90,
									cursor: "pointer",
									explodeOnClick: false,
									showInLegend: true,
									legendMarkerType: "square",			
									click: this.visitorsChartDrilldownHandler,
									indexLabelPlacement: "inside",
									indexLabelFontColor: "white",
									
									dataPoints: [
										{ y: this.sumValue1, name: "AGENCE 1", color: "#058dc7", indexLabel: this.entitePercent1+"%"},
										{ y: this.sumValue2, name: "AGENCE 2", color: "#50b432", indexLabel: this.entitePercent2+"%"}
									]
								}],
							
								"AGENCE 1": [{
									color: "#058dc7",
									name: "AGENCE 1",
									type: "column",
									dataPoints: 
									listDate1
										
								}],
								"AGENCE 2": [{
									color: "#50b432",
									name: "AGENCE 2",
									type: "column",
									dataPoints: 
										listDate2
									
								}]
							}; 	
							this.chart.options.data = this.options1["AGENCE 1 vs AGENCE 2"];
							this.chart.render();
						} ) 
					}
				)
			}
		
	  

	  /* updateDOB(dateObject: any) {
		this.f['start'] = dateObject.value._d.toLocaleDateString()
		console.log("DATE in dd/mm/yyyy", this.f['start'])
	  }*/

	 /** updateEndDOB(dateObject: any) {
		this.end = dateObject.value._d.toLocaleDateString()
		console.log("DATE in dd/mm/yyyy", this.end)
	  } */

 
  getTransactionsByEntite(user: User) {
 	console.log("userrrrrr", user)
    this.profilService.getProfilById(user.profil).subscribe(
		data => {
		console.log(data)
		this.profil = data.code;
		console.log(this.profil) 
				})

  }

  
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
			text: "AGENCE 1 vs AGENCE 2"
		},
		subtitles: [{
			backgroundColor: "#2eacd1",
			fontSize: 16,
			fontColor: "white",
			padding: 5
		}],
		data: []
	};
 
	handleClick(event: Event) { 
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options1["AGENCE 1 vs AGENCE 2"];
		this.chart.render(); 
		this.isButtonVisible = false;
	  } 	
	 
	getChartInstance(chart: object) {
		this.sumValue1 = 0
		this.sumValue2 = 0
		this.chart = chart;
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.transactionService.getTransactionsByEntite(1).subscribe(
			data => {
				this.transactionEntite1 = data
				console.log("TRANSACTION ENTITE1", this.transactionEntite1)
				console.log("TRANSACTION ENTITE1 LENGTH", this.transactionEntite1.length)
				this.transactionService.getTransactionsByEntite(2).subscribe(
					data => {
						this.transactionEntite2 = data
						console.log("TRANSACTION ENTITE2", this.transactionEntite2)
					for(let i = 0; i<this.transactionEntite1.length; i++) {
						this.sumValue1 += this.transactionEntite1[i].value
						
					}
					console.log("SOMME DES VALUES DE 1", this.sumValue1)
					for(let i = 0; i<this.transactionEntite2.length; i++) {
						this.sumValue2 += this.transactionEntite2[i].value
						
					}
					console.log("SOMME DES VALUES DE 2", this.sumValue2)
					this.entitePercent1 = ((this.sumValue1*100)/(this.sumValue1 + this.sumValue2)).toString()
					console.log("ENTTE PECENTAGE 1", this.entitePercent1)
					this.entitePercent2 = ((this.sumValue2*100)/(this.sumValue1 + this.sumValue2)).toString()
					console.log("ENTTE PECENTAGE 2", this.entitePercent2)
					var listDate1: { label: Date; y: number; }[] = [];
					var listDate2: { label: Date; y: number; }[] = [];

					this.transactionEntite1.forEach(function(d) {
						listDate1.push({
						 label: d.date,
						 y: d.value
					   });
					 });
					 
					 console.log("LIST", listDate1);

					 this.transactionEntite2.forEach(function(d) {
						listDate2.push({
						  label: d.date,
						  y: d.value
						});
					  });
					  
					  console.log("LIST", listDate2);
		
						this.options1 =  {
							"AGENCE 1 vs AGENCE 2": [{
								type: "pie",
								name: "AGENCE 1 vs AGENCE 2",
								startAngle: 90,
								cursor: "pointer",
								explodeOnClick: false,
								showInLegend: true,
								legendMarkerType: "square",			
								click: this.visitorsChartDrilldownHandler,
								indexLabelPlacement: "inside",
								indexLabelFontColor: "white",
								
								dataPoints: [
									{ y: this.sumValue1, name: "AGENCE 1", color: "#058dc7", indexLabel: this.entitePercent1+"%"},
									{ y: this.sumValue2, name: "AGENCE 2", color: "#50b432", indexLabel: this.entitePercent2+"%"}
								]
							}],
						
							"AGENCE 1": [{
								color: "#058dc7",
								name: "AGENCE 1",
								type: "column",
								dataPoints: 
								listDate1
									
							}],
							"AGENCE 2": [{
								color: "#50b432",
								name: "AGENCE 2",
								type: "column",
								dataPoints: 
									listDate2
								
							}]
						}; 	
						this.chart.options.data = this.options1["AGENCE 1 vs AGENCE 2"];
						this.chart.render();
					} )
				
	}
		)

	
		
	}

  /**

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
	}  */

}
