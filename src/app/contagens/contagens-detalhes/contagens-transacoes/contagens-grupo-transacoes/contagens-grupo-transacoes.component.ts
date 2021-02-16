import { MessageService } from './../../../../shared/message-service';
import { GrupoTransacaoService } from './grupo_transacao.service';
import { Component, Inject, OnInit } from '@angular/core';
import { GrupoTransacao } from './grupo-transacao';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContagensFuncaoDadosComponent } from '../../contagens-funcao-dados/contagens-funcao-dados.component';
import { Contagem } from 'src/app/contagens/contagem';

@Component({
  selector: 'app-contagens-grupo-tranacoes',
  templateUrl: './contagens-grupo-transacoes.component.html',
  styleUrls: ['./contagens-grupo-transacoes.component.css']
})
export class ContagensGrupoTransacoesComponent implements OnInit {
  novoEditar = "Novo";
  grupo: GrupoTransacao = new GrupoTransacao({});
  grupos: GrupoTransacao[] = [];
  constructor(private grupoTransacaoService: GrupoTransacaoService,
    public dialogRef: MatDialogRef<ContagensFuncaoDadosComponent>,
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

  onOkClick(){
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
