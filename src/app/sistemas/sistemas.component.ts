import { SistemasService } from './sistemas.service';
import { MessageService } from './../shared/message-service';
import { Sistema } from './sistema';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.css']
})

export class SistemasComponent implements OnInit {
  sistemas: Sistema[] = [];
  displayedColumns: string[] = ['nome', 'acao'];

  constructor(
    private mservice: MessageService,
    private sService: SistemasService
    ) { }

  ngOnInit(): void {
    this.sService.listar({}).subscribe(sistemas => { this.sistemas = sistemas });
  }

  apagar(sistema_id: number){
    if(confirm("Confirmar. Apagar o registro?") != true){
      return;
    }
    this.sService.apagar(sistema_id).subscribe(
      msg => {
        this.mservice.success("Registro apagado com sucesso.");
        this.ngOnInit();
      },
      erro => {
        this.mservice.error("Ocorreu um erro ao apagar registro.");
      }
    );
  }
}
