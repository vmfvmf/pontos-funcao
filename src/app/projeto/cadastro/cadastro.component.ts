import { SistemaService } from './../../sistema/sistema.service';
import { ProjetoService } from '../projeto.service';
import { Projeto } from '../projeto';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../../shared/Service/message.service';

@Component({
  selector: 'app-projeto-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class ProjetoCadastroComponent implements OnInit {
  projeto: Projeto = new Projeto();
  novoCadastro: boolean= true;
  sistemas = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {projeto: Projeto},
    public dialogRef: MatDialogRef<ProjetoCadastroComponent>,
    private projetoService: ProjetoService,
    private sService: SistemaService,
    private mService: MessageService
    ) {
      this.projeto = data.projeto ? data.projeto : new Projeto();
    }

  ngOnInit(): void {
    this.sService.listar().subscribe(
      (response) => {
        this.sistemas = response;
      },
      (error) => {
        this.mService.error("Ocorreu um erro ao carregar sistemas!");
        console.log(error);
      }
    );
  }

  close(){
    this.dialogRef.close(null);
  }

  salvar(){
    if(this.projeto.id){
      this.projetoService.editar(this.projeto).subscribe(
        (response) => {
          this.mService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.mService.error("Ocorreu um erro ao salvar!");
          console.log(error);
         }, () => this.close()
        );
    } else {
      this.projetoService.novo(this.projeto).subscribe(
        (response) => {
          this.mService.success("Registro salvo com sucesso!");
        },
        (error) => {
          this.mService.error("Ocorreu um erro ao salvar!");
          console.log(error);
        }, () => this.close()
        );
    }
  }
}
