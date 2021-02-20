
import { HttpParams } from "@angular/common/http";
import { Coluna } from "../arquivo-referenciado/tabela";
import { Transacao } from './transacao';
import { TransacaoTD } from './transacao-td';


export interface ITransacaoTDColuna {
  id?: number;
  transacao?: Transacao;
  coluna?: Coluna;
}

export class TransacaoTDColuna extends TransacaoTD {
  coluna?: Coluna;

  constructor(i: ITransacaoTDColuna){
    super(i);
    this.coluna = i.coluna;
  }

  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams();
      return httpParams;
    }
}
