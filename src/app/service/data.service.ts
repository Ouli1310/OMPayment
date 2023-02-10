import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Profil } from '../model/user';

@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor() { }

  public profil!: string 

  public profilSubject = new Subject<string>()

  public profilSource = new BehaviorSubject(this.profil)

  currentProfil = this.profilSource.asObservable()

  changeProfil(profil: string) {
    console.log("changeeeee", profil)
    this.profilSource.next(profil)
  }
}
