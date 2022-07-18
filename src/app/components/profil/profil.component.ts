import { Component, OnInit } from '@angular/core';
import { Profil, User } from 'src/app/model/user';
import { ProfilService } from 'src/app/service/profil.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  currentUserId: any;
  currentUser: User = new User;
  profil: Profil = new Profil()

  constructor(private token: TokenStorageService, private userService: UserService, private profilService: ProfilService) { }

  ngOnInit(): void {
    this.currentUserId = this.token.getUser().id;
    console.log(this.currentUserId)
    this.userService.getUserById(this.currentUserId).subscribe(
      data => {
        this.currentUser = data
        console.log(this.currentUser)
        this.profilService.getProfilById(this.currentUser.profil).subscribe(
          data => {
this.profil = data
          }
        )
        console.log(this.currentUser.balance)
      }
    )
  }

}
