import { TransacaoTD } from './transacaotd';
import { MensagemTela } from './contagens-mensagens-telas/mensagem-tela';

import { HttpParams } from "@angular/common/http";
import { Transacao } from './transacao';

export interface ITransacaoTDMensagemTela {
  id?: number;
  transacao?: Transacao;
  msgTela?: MensagemTela;
}

export abstract class TransacaoTDMensagemTela extends TransacaoTD {
  msgTela?: MensagemTela;

  constructor(i: ITransacaoTDMensagemTela){
    super(i);
    this.msgTela = i.msgTela;
  }

  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams();
      return httpParams;
    }
}
