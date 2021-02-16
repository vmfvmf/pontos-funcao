import { MensagemTela } from './contagens-mensagens-telas/mensagem-tela';

import { HttpParams } from "@angular/common/http";
import { Transacao } from './transacao';

export interface ITransacaoTD {
  id?: number;
  transacao?: Transacao;
  mensagemTela?: MensagemTela;
}

export class TransacaoTD {
  id?: number;
  transacao?: Transacao;
  mensagemTela?: MensagemTela;

  constructor(i: ITransacaoTD){
    this.id = i.id;
    this.mensagemTela = i.mensagemTela;
    this.transacao = i.transacao;
  }

  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams();
      return httpParams;
    }
}
