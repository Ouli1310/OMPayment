import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CashInRequest } from 'src/app/model/cashInRequest';
import { Customer, IdType, Method, Money, Partner } from 'src/app/model/transactionRequest';
import { User } from 'src/app/model/user';
import { CashInService } from 'src/app/service/cash-in.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cash-in',
  templateUrl: './cash-in.component.html',
  styleUrls: ['./cash-in.component.css']
})
export class CashInComponent implements OnInit {


  
  firstForm!: UntypedFormGroup;
  secondeForm!: UntypedFormGroup;
  thirdForm!: UntypedFormGroup;
  forthForm!: UntypedFormGroup;
  fifthForm!: UntypedFormGroup;
  sixthForm!: UntypedFormGroup;
  seventhForm!: UntypedFormGroup;
  eighthForm!: UntypedFormGroup;
  pinCode!: any;
  user: any;
  user1: User = new User();
  isSuccessful = false;
  errorMessage = '';
  submitted = false;
  methodes!: Method[];
  methodeChoisie!: string;
  idTypes!: IdType[];
  idTypeChoisi: IdType = new IdType();
  idTypeNumb: IdType = new IdType();
  idTypeMsisdn: IdType = new IdType();
  idPartner!: any;


  constructor(
    private tokenStorage: TokenStorageService, 
    private router: Router, 
    private formBuilder: UntypedFormBuilder, 
    private userService: UserService,
    private cashInService: CashInService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    
    if(this.tokenStorage.getToken() == null) {
      console.error("No token");
      this.router.navigate([''])
       
     }

    this.secondeForm = this.formBuilder.group({
      idTypeClient: ['', Validators.required],
      idClient: ['', Validators.required],
      otpClient: ['', Validators.required]
    })

    this.thirdForm = this.formBuilder.group({
      idTypeP: ['', Validators.required],
      idP: ['', Validators.required]
    })

    this.forthForm = this.formBuilder.group({
      value: ['', Validators.required],
      unit: ['', Validators.required]
    })

    this.fifthForm = this.formBuilder.group({
      reference: ['', Validators.required],
      receiveNotification: ['', Validators.required]
    })

  




    this.user = this.tokenStorage.getUser();
    console.log(this.user)

    this.userService.getUserById(this.user.id).subscribe(
      data => {
        this.user1 = data
        console.log(this.user1)
        console.log(this.user1.msisdn)
        this.idPartner = this.user1.msisdn
      }
    )

    this.userService.getUserPinCode(this.user.id).subscribe(
      data => {
        console.log(data)
        this.pinCode = data;
      }
    );

    
    this.transactionService.getAllIdType().subscribe(
      data => {
        this.idTypes = data
       this.idTypeMsisdn = this.idTypes[0]
      }
    )

  }

  get idTypeClient() {
    return this.secondeForm.get('idTypeClient');
  }

  get idClient() {
    return this.secondeForm.get('idClient');
  }

  get otpClient() {
    return this.secondeForm.get('otpClient');
  }

  get g() {
    return this.secondeForm.controls;
  }

  get idTypeP() {
    return this.thirdForm.get('idTypeP');
  }

  get idP() {
    return this.thirdForm.get('idP');
  }

  get h() {
    return this.thirdForm.controls;
  }

  get value() {
    return this.forthForm.get('value');
  }

  get unit() {
    return this.forthForm.get('unit');
  }

  get j() {
    return this.forthForm.controls;
  }

  get reference() {
    return this.fifthForm.get('reference');
  }

  get receiveNotification() {
    return this.fifthForm.get('receiveNotification');
  }

  get k() {
    return this.fifthForm.controls;
  }


  initCashIn() {
    this.submitted = true;
    
    const cashInRequest = new CashInRequest();

    
      const amount: Money = {
        unit: this.j['unit'].value,
        value: this.j['value'].value
      }
      console.log(amount)
      const partner: Partner = {
        encryptedPinCode: this.pinCode,
        idType: this.idTypeMsisdn.name,
        id: this.idPartner
      }
      console.log(partner)
      const customer: Customer = {
        idType: this.idTypeMsisdn.name,
        id: this.g['idClient'].value,
        otp: ''
      }
      console.log(customer)
      
     
      cashInRequest.amount = amount;
      cashInRequest.partner = partner;
      cashInRequest.customer = customer;
      cashInRequest.reference = this.k['reference'].value;
      cashInRequest.receiveNotification = false;
  
      console.log(cashInRequest);
      this.cashInService.initCashIn(this.user.id, cashInRequest).subscribe(
        {
          next: data => {
            this.isSuccessful = true;
            console.log(data)
        console.log(this.isSuccessful)
        this.router.navigate(['/transactions'])
          },   error: err => {
            this.errorMessage = err.error.message;
            console.log("fffffffffffffffffffffff")
            console.log(err.error)
          }
        }
     
      )
    }
   
    

    goToTransactions() {
      this.router.navigate(["/transactions"])
    }
   


  }


