import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  firstForm!: FormGroup;
  secondeForm!: FormGroup;
  thirdForm!: FormGroup;
  forthForm!: FormGroup;
  fifthForm!: FormGroup;

  constructor(private tokenStorage: TokenStorageService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if(this.tokenStorage.getToken() == null) {
      console.error("No token");
      this.router.navigate([''])
       
     }

     this.firstForm = this.formBuilder.group({
      methode: ['', Validators.required]
    })

    this.secondeForm = this.formBuilder.group({
      idTypeClient: ['', Validators.required],
      idClient: ['', Validators.required],
      otpClient: ['', [Validators.required, Validators.email]]
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
  }

  get methode() {
    return this.firstForm.get('methode');
  }

  get f() {
    return this.firstForm.controls;
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
    return this.forthForm.get('idP');
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


}