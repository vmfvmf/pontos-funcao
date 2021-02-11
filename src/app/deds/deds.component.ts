import { DedsService } from './deds.service';
import { MessageService } from '../shared/message-service';
import { Component, OnInit } from '@angular/core';
import { Ded } from './ded';
import { FiltroDeds } from './filtro-ded';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deds',
  templateUrl: './deds.component.html',
  styleUrls: ['./deds.component.css']
})
export class DedsComponent implements OnInit {
  deds: Ded[];
  displayedColumns: string[] = ['numero', 'descricao', 'acao'];

  constructor(
    private mservice: MessageService,
    private router: Router,
    private dservice: DedsService
    ) { }

  ngOnInit(): void {
    this.dservice.listar(new FiltroDeds({})).subscribe(deds => {
      this.deds = deds;
     });
  }


  apagar(ded_id: number){
    if(confirm("Confirmar. Apagar o registro?") != true){
      return;
    }
    this.dservice.apagar(ded_id).subscribe(
      msg => {
        this.mservice.success("Registro apagado com sucesso.");
        this.ngOnInit();
      },
      erro => {
        this.mservice.error("Ocorreu um erro ao apagar registro.");
      }
    );
  }
  ver(ded_id: number){
    this.router.navigate(['/ded/' + ded_id ]);
  }
}
