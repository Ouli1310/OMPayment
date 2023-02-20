import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable()


export class DataService {

  private profilSource = new BehaviorSubject('noProfil')
  currentProfil = this.profilSource.asObservable()

  constructor() { }

  changeProfil(profil: string) {
    this.profilSource.next(profil)
  }
}
