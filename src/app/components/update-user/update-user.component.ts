import { Component, OnInit } from '@angular/core';
import { Entite, Profil, User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProfilService } from 'src/app/service/profil.service';
import { EntiteService } from 'src/app/service/entite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateForm!: UntypedFormGroup;

  isSuccessful = false;
  errorMessage = '';
  profilChoisi!: Profil;
  profils!: Profil[];
  submitted = false;
  entiteChoisi!: Entite;
  entites!: Entite[];
  id!: any;
  updateUser: User = new User();
  profilUser: Profil = new Profil()
  entiteUser: Entite = new Entite()

  constructor(
    private userService: UserService,
    private formBuilder: UntypedFormBuilder, 
    private profilService: ProfilService,
    private entiteService: EntiteService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      msisdn: [''],
      code: [''],
      profil: ['', Validators.required],
      entite: [''],
    })

    let urlTree = this.router.parseUrl(this.router.url);
    this.id = urlTree.root.children['primary'].segments['2'].path
    console.log(this.id)
    this.userService.getUserById(this.id).subscribe(
      data => {
        this.updateUser = data
        console.log("UpdatingUser", this.updateUser) 
        this.profilService.getProfilById(this.updateUser.profil).subscribe(
          data => {
this.profilUser = data
console.log(this.profilUser)
          }
        )
this.entiteService.getEntiteById(this.updateUser.entite).subscribe(
  data => {
    this.entiteUser = data
    console.log(this.entiteUser)
  } 
)
      
      })
       
    
        this.getProfils()
        this.getEntites()
  }

  get firstName() {
    return this.updateForm.get('firstName');
  }

  get lastName() {
    return this.updateForm.get('lastName');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get msisdn() {
    return this.updateForm.get('msisdn');
  }

  get code() {
    return this.updateForm.get('code');
  }

  get profil() {
    return this.updateForm.get('profil');
  }

  
  get entite() {
    return this.updateForm.get('entite');
  }

  get f() {
    return this.updateForm.controls;
  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
}

  getProfils() {
    this.profilService.getAllProfils().subscribe (
      data => {
        this.profils = data;
      }
    )
  }


  getEntites() {
    this.entiteService.getAllEntites().subscribe(
      data => {
        this.entites = data
        console.log(this.entites)
      }
    )
  }

  getProfilChoisi(p: Profil) {
    this.profilChoisi = p;
    console.log(this.profilChoisi.code)
  }

  getEntiteChoisi(e: Entite) {
    this.entiteChoisi = e;
  }



  updatedUser(id: number): void {
    this.submitted = true
        const updatedUser = new User();
        updatedUser.firstName = this.f['firstName'].value
        updatedUser.lastName = this.f['lastName'].value
        updatedUser.email = this.f['email'].value
        updatedUser.profil = this.profilChoisi.id
       
        updatedUser.msisdn = this.f['msisdn'].value
        updatedUser.code = this.f['code']?.value
          
        updatedUser.entite = this.entiteChoisi?.id
        
      
        console.log(updatedUser)
        this.userService.updateUser(id, updatedUser).subscribe (
          {
            next: data => {
              this.isSuccessful = true;
              console.log(data)
          console.log(this.isSuccessful)
            },   error: err => {
              this.errorMessage = err.error.message;
              console.log("fffffffffffffffffffffff")
              console.log(err.error)
            }
    
          }
        )

      
  }

}
