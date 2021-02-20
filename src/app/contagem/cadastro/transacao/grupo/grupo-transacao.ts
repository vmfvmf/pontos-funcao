import { Contagem } from './../../../contagem';
import { Transacao } from '../transacao';
import { HttpParams } from "@angular/common/http";

export interface IGrupoTransacao {
  id?: number;
  nome?: String;
  transacoes?: Transacao[];
  contagem?: Contagem;
}

export class GrupoTransacao {
  id?: number;
  nome?: String;
  transacoes?: Transacao[];
  contagem?: Contagem;

  constructor(i: IGrupoTransacao){
    this.id = i.id;
    this.nome = i.nome;
    this.transacoes = i.transacoes;
    this.contagem = i.contagem;
  }

  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    //let httpParams = this.paginacao.toHttpParams();

      if (this.nome !== undefined) {
        httpParams = httpParams.set('nome', this.nome.toString());
      }
      if (this.contagem !== undefined) {
        httpParams = httpParams.set('contagem.id', this.contagem.id.toString());
      }
      return httpParams;
    }
}
