import { MessageService } from './../../../shared/message-service';
import { TransacaoTDMensagemTelaService } from './transacaotdmensagemtela.service';
import { TransacaoService } from './transacao.service';
import { GrupoTransacaoService } from './contagens-grupo-transacoes/grupo_transacao.service';
import { ComplexidadeEnum, FuncoesTransacao, SubTipoItemContagemEnum } from './../../item-contagem';
import { Transacao } from './transacao';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GrupoTransacao } from './contagens-grupo-transacoes/grupo-transacao';
import { MensagemTela } from './contagens-mensagens-telas/mensagem-tela';
import { MensagemTelaService } from './contagens-mensagens-telas/mensagem-tela.service';
import { TransacaoTD } from './transacaotd';

@Component({
  selector: 'app-contagens-transacoes',
  templateUrl: './contagens-transacoes.component.html',
  styleUrls: ['./contagens-transacoes.component.css']
})
export class ContagensTransacoesComponent implements OnInit {
  transacao: Transacao;
  subtipos: string[] = FuncoesTransacao;
  grupos: GrupoTransacao[];
  msgsTela: MensagemTela[] = [];
  selectedMsgsTela: MensagemTela[];

  constructor(
    public dialogRef: MatDialogRef<ContagensTransacoesComponent>,
    private grupoService: GrupoTransacaoService,
    private msgService: MessageService,
    private msgTelasService: MensagemTelaService,
    private transacaoService: TransacaoService,
    private transacaoTdMsgTelaService: TransacaoTDMensagemTelaService,
    @Inject(MAT_DIALOG_DATA) public data: { transacao: Transacao }
  ) {
    this.transacao = data.transacao;
    this.selectedMsgsTela = [];
  }

  ngOnInit(): void {
    this.grupoService.listar(new GrupoTransacao({})).subscribe(response => {
      this.grupos = response;
    }, error => {
      console.log("Erro ao recuperar lista de grupos", error);
    });
    this.msgTelasService.listar(new MensagemTela({})).subscribe(response => {
      this.msgsTela = response;
      this.transacao.transacoesTD.forEach(td => {
        this.selectedMsgsTela.push(this.msgsTela.find(el => el.id == td.mensagemTela.id));
      });
      this.atualizaContagem();
    }, error => {
      console.log("Erro ao recuperar lista de mensagens", error);
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  checkMsgTelaValue(selecionadosTela: MensagemTela[]){
    if(!this.transacao.id){
      this.transacaoService.novo(this.transacao).subscribe(response => {
        this.transacao.id = response.id;
        this.msgService.success("Registro salvo com sucesso.");
        this.salvaChecksSelecionados(selecionadosTela);
      }, error => {
        this.msgService.success("Ocorreu um erro ao salvar registro.");
        console.log("Erro ao criar nova transação", error, this.transacao);
      });
    }else{
      this.salvaChecksSelecionados(selecionadosTela);
    }

  }

  salvaChecksSelecionados(selecionadosTela: MensagemTela[]){
    this.transacaoTdMsgTelaService.apagarTDMsgTelaEmLote(this.transacao.id).subscribe(() => {
      let transacaosTD = selecionadosTela.map(m => {
        return new TransacaoTD({ transacao: new Transacao({ id: this.transacao.id }), mensagemTela: new MensagemTela({id: m.id}) });
      });
      this.transacaoTdMsgTelaService.salvaMsgTelaEmLote(transacaosTD).subscribe(response2 => {
        console.log("salvando transTD",response2, transacaosTD);
        this.atualizaContagem();
      },error2 => {
        console.log("Erro ao criar transação td em lote", error2, selecionadosTela);
      });
    }, error => {
      console.log("Erro ao deletar transação td com transação id", error, this.transacao.id);
    });
  }

  onOkClick() {
    this.transacaoService.novo(this.transacao).subscribe(response => {
      console.log(response);
      this.msgService.success("Registro salvo com sucesso.");
    }, error => {
      this.msgService.success("Ocorreu um erro ao salvar registro.");
      console.log("Erro ao criar nova transação", error, this.transacao);
    });
  }

  atualizaContagem() {
    this.transacao.td = 0;
    this.transacao.td += this.selectedMsgsTela.length;
    // this.transacao.tabelas.forEach((t) => {
    //   t.colunas.forEach((c) => {
    //     i++;
    //   });
    // });
    // this.transacao.tr = this.transacao.tabelas.length;
    this.analisaComplexidade();
    this.analisaPF();
    if(this.transacao.id){
      /** Todo: arrumar pq n funciona */
      this.transacaoService.editar(this.transacao).subscribe(fd => {
        // this.transacao = fd;
        console.log("Atualização", fd);
      });
    }
  }
  analisaComplexidade() {
    if ((this.transacao.td < 50 && this.transacao.tr == 1) || (this.transacao.td < 20 && this.transacao.tr <= 5)) {
      this.transacao.complexidade = ComplexidadeEnum.baixa;
    } else if (
      (this.transacao.td > 50 && this.transacao.tr == 1) ||
      (this.transacao.td >= 20 && this.transacao.td <= 50 && this.transacao.tr <= 5)
    ) {
      this.transacao.complexidade = ComplexidadeEnum.media;
    } else {
      this.transacao.complexidade = ComplexidadeEnum.alta;
    }
  }
  analisaPF() {
    switch (this.transacao.subtipo) {
      case SubTipoItemContagemEnum.ALI:
        switch (this.transacao.complexidade) {
          case ComplexidadeEnum.baixa:
            this.transacao.pf = 7;
            break;
          case ComplexidadeEnum.media:
            this.transacao.pf = 10;
            break;
          case ComplexidadeEnum.alta:
            this.transacao.pf = 15;
            break;
        }
        break;
      case SubTipoItemContagemEnum.AIE:
        switch (this.transacao.complexidade) {
          case ComplexidadeEnum.baixa:
            this.transacao.pf = 5;
            break;
          case ComplexidadeEnum.media:
            this.transacao.pf = 7;
            break;
          case ComplexidadeEnum.alta:
            this.transacao.pf = 10;
            break;
        }
    }
  }
}
