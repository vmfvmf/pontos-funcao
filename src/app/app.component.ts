import { AppSharedService } from './app-shared.service';
import { FiltroDeds } from './deds/filtro-ded';
import { DedsService } from './deds/deds.service';
import { Ded } from './deds/ded';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pontos de Função';
  deds: Ded[] = [];
  selectedDed: Ded = undefined;

  constructor(
    private router: Router,
    public shared: AppSharedService,
    private dedService: DedsService
  ){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dedService.listar(new FiltroDeds({})).subscribe(deds => { this.deds =  deds });

  }

  navega(newValue){
    this.shared.selectedDed.next(this.selectedDed);
    this.router.navigate(['/deds/' + newValue.id + '/sprints']);
    this.shared.selectedDed.next(this.selectedDed);

  }
}
