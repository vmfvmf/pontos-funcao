import { MensagemTela } from './mensagem-tela/mensagem-tela';

import { HttpParams } from "@angular/common/http";
import { Transacao } from './transacao';
import { Coluna } from '../arquivo-referenciado/tabela';

export enum TipoTransacaoTDEnum {
  ARQUIVO_REFERENCIADO = "ARQUIVO_REFERENCIADO",
  MENSAGEM_TELA = "MENSAGEM_TELA"
}
export interface ITransacaoTD {
  id?: number;
  transacao?: Transacao;
  mensagemTela?: MensagemTela;
  coluna?: Coluna;
  tipo?:TipoTransacaoTDEnum;
}

export class TransacaoTD {
  id?: number;
  transacao?: Transacao;
  mensagemTela?: MensagemTela;
  coluna?: Coluna;
  tipo?:TipoTransacaoTDEnum;

  constructor(i: ITransacaoTD){
    this.id = i.id;
    this.tipo = i.tipo;
    this.transacao = i.transacao;
    this.mensagemTela = i.mensagemTela;
    this.coluna = i.coluna;
  }

  public static toHttpParams(iTransacaoTD: ITransacaoTD): HttpParams {
    let httpParams = new HttpParams();
      return httpParams;
    }
}
