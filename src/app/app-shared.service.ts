import { BehaviorSubject } from "rxjs";
import { Injectable } from '@angular/core';
import { Ded } from './deds/ded';

@Injectable({
  providedIn: 'root',
})
export class AppSharedService {
  public selectedDed: BehaviorSubject<Ded> = new BehaviorSubject<Ded>({});

  constructor(){
  }
}
