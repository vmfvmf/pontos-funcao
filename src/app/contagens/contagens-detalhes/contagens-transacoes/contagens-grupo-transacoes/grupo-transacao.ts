import { Transacao } from '../transacao';
import { HttpParams } from "@angular/common/http";
import { Contagem } from 'src/app/contagens/contagem';

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
      return null;
    }
}
