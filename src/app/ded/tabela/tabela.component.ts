import { DedCadastroComponent } from '../cadastro/cadastro.component';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'pje-componentes';
import { Ded } from '../ded';
import { DedService } from '../ded.service';
import { FiltroDeds } from '../filtro-ded';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deds',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class DedTabelaComponent implements OnInit {
  deds: Ded[];

  constructor(
    public dialog: MatDialog,
    private mservice: MessageService,
    private dservice: DedService
    ) { }

  ngOnInit(): void {
    this.updateResultado();
  }

  updateResultado(){
    this.dservice.listar().subscribe(deds => {
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
    novoEditar(ded: Ded){
      const dialogRef = this.dialog.open(DedCadastroComponent, {
        width: '300px',
        data: {ded: ded}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.updateResultado();
      });
  }
}
