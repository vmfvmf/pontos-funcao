import { SistemaCadastroComponent } from '../cadastro/cadastro.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sistema } from '../sistema';
import { SistemaService } from '../sistema.service';
import { MessageService } from '../../shared/Service/message.service';

@Component({
  selector: 'app-sistema-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})

export class SistemaTabelaComponent implements OnInit {
  sistemas: Sistema[] = [];

  constructor(
    public dialog: MatDialog,
    private mservice: MessageService,
    private sService: SistemaService
    ) { }

  ngOnInit(): void {
    this.updateResultados();
  }
  updateResultados() {
    this.sService.listar().subscribe(sistemas => { this.sistemas = sistemas });
  }

  novoEditar(sistema: Sistema){
    const dialogRef = this.dialog.open(SistemaCadastroComponent, {
      width: '300px',
      data: {sistema: sistema}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateResultados();
    });
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
