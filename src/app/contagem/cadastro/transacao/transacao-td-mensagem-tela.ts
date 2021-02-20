
import { HttpParams } from "@angular/common/http";
import { MensagemTela } from "./mensagem-tela/mensagem-tela";
import { Transacao } from './transacao';
import { TransacaoTD } from './transacao-td';

export interface ITransacaoTDMensagemTela {
  id?: number;
  transacao?: Transacao;
  mensagemTela?: MensagemTela;
}

export class TransacaoTDMensagemTela extends TransacaoTD {
  mensagemTela?: MensagemTela;

  constructor(i: ITransacaoTDMensagemTela){
    super(i);
    this.mensagemTela = i.mensagemTela;
  }

  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams();
      return httpParams;
    }
}
