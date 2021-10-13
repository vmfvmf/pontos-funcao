import { GrupoComponent } from './grupo/grupo.component';
import { TransacaoCadastroComponent } from './cadastro/cadastro.component';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Contagem } from "../../contagem";
import { Transacao } from './transacao';
import { Grupo } from './grupo/grupo';
import { AbstractContagemItem, TipoContagemItemEnum } from '../../abstract-contagem-item';
import { TransacaoService } from './transacao.service';
import { MessageService } from '../../../shared/Service/message.service';

@Component({
  selector: 'app-contagem-cadastro-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.scss'],
})
export class TransacaoComponent implements OnInit {
  @Input()
  contagem: Contagem;
  subTotalPf = 0;

  @Output()
  salvarContagem = new EventEmitter<String>();

  @Input()
  somenteLeitura = true;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  novoEditar(transacao?: Transacao) {
    if (!transacao) {
      transacao = new Transacao();
      this.contagem.transacoes.push(transacao);
    }
    const dialogRef = this.dialog.open(TransacaoCadastroComponent, {
      width: '600px',
      data: { transacao: transacao, contagem: this.contagem, somenteLeitura: this.somenteLeitura }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salvarContagem.emit("Transação incluída/alterada com sucesso!");
      }
    });
  }


  gerenciadorGrupo() {
    const grupo = new Grupo(this.contagem);
    this.dialog.open(GrupoComponent, {
      width: '600px',
      data: { grupo: grupo }
    });
  }


  apagar(transacaoId: number) {
    if (confirm('Confirmar. Apagar o registro?') != true) {
      return;
    }
    const i = this.contagem.transacoes.findIndex(t => t.id === transacaoId);
    this.contagem.transacoes.splice(i, 1);
    this.salvarContagem.emit("Transação excluída com sucesso!");
  }

}
