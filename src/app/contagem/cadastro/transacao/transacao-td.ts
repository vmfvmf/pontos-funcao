
import { HttpParams } from "@angular/common/http";
import { Transacao } from './transacao';

export interface ITransacaoTD {
  id?: number;
  transacao?: Transacao;
}

export abstract class TransacaoTD {
  id?: number;
  transacao?: Transacao;

  constructor(i: ITransacaoTD){
    this.id = i.id;
    this.transacao = i.transacao;
  }

  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams();
      return httpParams;
    }
}
