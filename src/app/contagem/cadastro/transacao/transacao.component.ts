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
import { of } from 'rxjs';

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
  salvarContagem = new EventEmitter<{msg: String, item?: Transacao}>();

  @Input()
  somenteLeitura = true;

  @Input()
  transacoesComparar: Transacao[] = [];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    of(this.transacoesComparar).subscribe(tsAlterados => {

    });
  }

  novoEditar(transacao?: Transacao) {
    if (!transacao) {
      transacao = new Transacao();
    }
    const dialogRef = this.dialog.open(TransacaoCadastroComponent, {
      width: '600px',
      data: { transacao: transacao, contagem: this.contagem, somenteLeitura: this.somenteLeitura }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salvarContagem.emit({msg: "Transação incluída/alterada com sucesso!", item: result});
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
    this.salvarContagem.emit({msg: "Transação excluída com sucesso!"});
  }

}
