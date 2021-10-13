import { ProjetoCadastroComponent } from '../cadastro/cadastro.component';

import { Component, OnInit } from '@angular/core';
import { Projeto } from '../projeto';
import { ProjetoService } from '../projeto.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../shared/Service/message.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class ProjetoTabelaComponent implements OnInit {
  projetos: Projeto[];

  constructor(
    public dialog: MatDialog,
    private mservice: MessageService,
    private projetoService: ProjetoService
    ) { }

  ngOnInit(): void {
    this.updateResultado();
  }

  updateResultado(){
    this.projetoService.listar().subscribe(projetos => {
      this.projetos = projetos;
     });
  }


  apagar(projeto_id: number){
    if(confirm("Confirmar. Apagar o registro?") != true){
      return;
    }
    this.projetoService.apagar(projeto_id).subscribe(
      msg => {
        this.mservice.success("Registro apagado com sucesso.");
        this.ngOnInit();
      },
      erro => {
        this.mservice.error("Ocorreu um erro ao apagar registro.");
      }
    );
  }
    novoEditar(projeto: Projeto){
      const dialogRef = this.dialog.open(ProjetoCadastroComponent, {
        width: '300px',
        data: {projeto: projeto}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.updateResultado();
      });
  }
}
