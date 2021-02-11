import { BehaviorSubject } from "rxjs";
import { Injectable } from '@angular/core';
import { Ded } from './deds/ded';
import { Sprint } from "./sprints/sprint";

@Injectable({
  providedIn: 'root',
})
export class AppSharedService {
  public selectedDed: BehaviorSubject<Ded> = new BehaviorSubject<Ded>({});
  public selectedSprint: BehaviorSubject<Sprint> = new BehaviorSubject<Sprint>({});

  constructor(){
  }
}
