
import { HttpParams } from "@angular/common/http";
import { Transacao } from './transacao';
import { Coluna } from '../arquivo-referenciado/tabela';

export enum TipoTransacaoTDEnum {
  ARQUIVO_REFERENCIADO = "ARQUIVO_REFERENCIADO",
  MENSAGEM = "MENSAGEM",
  ACAO = 'ACAO'
}
export interface ITransacaoTD {
  id?: number;
  transacao?: Transacao;
  coluna?: Coluna;
  tipo?:TipoTransacaoTDEnum;
}

export class TransacaoTD {
  id?: number;
  transacao?: Transacao;
  coluna?: Coluna;
  tipo?:TipoTransacaoTDEnum;

  constructor(i: ITransacaoTD){
    this.id = i.id;
    this.tipo = i.tipo;
    this.transacao = i.transacao;
    this.coluna = i.coluna;
  }

  public static toHttpParams(iTransacaoTD: ITransacaoTD): HttpParams {
    let httpParams = new HttpParams();
      return httpParams;
    }
}
