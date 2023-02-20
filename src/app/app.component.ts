import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './model/user';
import { DataService } from './service/data.service';
import { ProfilService } from './service/profil.service';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ompayment';
  constructor(
    public dataServ: DataService,
    private tokenStorageService: TokenStorageService,
    private profilServ: ProfilService
  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser()
    user ? this.profilServ.getProfilById(user.profil).subscribe( profil => {
      this.dataServ.changeProfil(profil.code)
    }) : null
  }
}
