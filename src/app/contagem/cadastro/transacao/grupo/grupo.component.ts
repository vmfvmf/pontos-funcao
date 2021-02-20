
import { GrupoTransacaoService } from './grupo_transacao.service';
import { Component, Inject, OnInit } from '@angular/core';
import { GrupoTransacao } from './grupo-transacao';
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
  grupo: GrupoTransacao = new GrupoTransacao({});
  grupos: GrupoTransacao[] = [];
  constructor(
    private grupoTransacaoService: GrupoTransacaoService,
    public dialogRef: MatDialogRef<GrupoComponent>,
    private msgService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: { grupo: GrupoTransacao }) {
      this.grupo = data.grupo;
     }

  ngOnInit(): void {
    this.updateGrupos();
  }

  updateGrupos(){
    this.grupoTransacaoService.listar(new GrupoTransacao({ contagem: new Contagem({id: this.grupo.contagem.id}) })).subscribe(response =>{
      this.grupos = response;
    }),error => {
      console.log('Erro ao recuperar grupos', error);
    };
  }

  apagarGrupo(grupo: GrupoTransacao){
    this.grupoTransacaoService.apagar(grupo.id).subscribe(response =>{
      this.updateGrupos();
      this.msgService.success("Registro apagado com sucesso.")
    }, error => {
      console.log('Erro ao apagar grupo de id', error, grupo);
    });
  }

  editarGrupo(grupo: GrupoTransacao){
    grupo.contagem = this.grupo.contagem;
    this.grupo = new GrupoTransacao(grupo);
    this.novoEditar = "Editar";
  }

  cancelarEdicao(){
    this.grupo.id = undefined;
    this.grupo.nome = "";
    this.novoEditar = "Novo";
  }

  salvar(){
    this.grupoTransacaoService.novo(this.grupo).subscribe((response) =>
    {
      this.updateGrupos();
      this.cancelarEdicao();
      this.msgService.success("Registro salvo com sucesso.");
    }, (error) => {
      console.log("Erro ao salvar novo grupo transacao", error, "novo grupo", this.grupo);
    });
  }

}
