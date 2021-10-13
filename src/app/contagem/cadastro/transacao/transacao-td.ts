
import { HttpParams } from "@angular/common/http";
import { Transacao } from './transacao';
import { Coluna } from '../arquivo-referenciado/tabela';

export enum TipoTransacaoTDEnum {
  ARQUIVO_REFERENCIADO = "ARQUIVO_REFERENCIADO",
  MENSAGEM = "MENSAGEM",
  ACAO = 'ACAO'
}
export class TransacaoTD {
  id: number;
  transacao: Transacao;
  coluna: Coluna;

  constructor(transacao?: Transacao){
    this.transacao = transacao ? transacao : new Transacao();
  }

  public static toHttpParams(iTransacaoTD: TransacaoTD): HttpParams {
    let httpParams = new HttpParams();
      return httpParams;
    }
}
