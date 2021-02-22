
import { GrupoService } from './grupo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Grupo } from './grupo';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'pje-componentes';
import { Contagem } from '../../../../contagem/contagem';

@Component({
  selector: 'app-contagens-grupo-transacao',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {
  novoEditar = "Novo";
  grupo: Grupo = new Grupo({});
  grupos: Grupo[] = [];
  constructor(
    private grupoService: GrupoService,
    public dialogRef: MatDialogRef<GrupoComponent>,
    private msgService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: { grupo: Grupo }) {
      this.grupo = data.grupo;
     }

  ngOnInit(): void {
    this.updateGrupos();
  }

  updateGrupos(){
    this.grupoService.listar({ contagem: this.grupo.contagem }).subscribe(response =>{
      this.grupos = response;
    }),error => {
      console.log('Erro ao recuperar grupos', error);
    };
  }

  apagarGrupo(grupo: Grupo){
    this.grupoService.apagar(grupo.id).subscribe(response =>{
      this.updateGrupos();
      this.msgService.success("Registro apagado com sucesso.")
    }, error => {
      console.log('Erro ao apagar grupo de id', error, grupo);
    });
  }

  editarGrupo(grupo: Grupo){
    grupo.contagem = this.grupo.contagem;
    this.grupo = new Grupo(grupo);
    this.novoEditar = "Editar";
  }

  cancelarEdicao(){
    this.grupo.id = undefined;
    this.grupo.nome = "";
    this.novoEditar = "Novo";
  }

  salvar(){
    this.grupoService.novo(this.grupo).subscribe((response) =>
    {
      this.updateGrupos();
      this.cancelarEdicao();
      this.msgService.success("Registro salvo com sucesso.");
    }, (error) => {
      console.log("Erro ao salvar novo grupo transacao", error, "novo grupo", this.grupo);
    });
  }

}
