import { Contagem } from '../../../contagem';
import { Transacao } from '../transacao';
import { HttpParams } from "@angular/common/http";

export interface IGrupo {
  id?: number;
  nome?: String;
  transacoes?: Transacao[];
  contagem?: Contagem;
}

export class Grupo {
  id?: number;
  nome?: String;
  transacoes?: Transacao[];
  contagem?: Contagem;

  constructor(i: IGrupo){
    this.id = i.id;
    this.nome = i.nome;
    this.transacoes = i.transacoes;
    this.contagem = i.contagem;
  }

  public static toHttpParams(iGrupo: IGrupo): HttpParams {
    let httpParams = new HttpParams();
    //let httpParams = this.paginacao.toHttpParams();

      if (iGrupo.nome !== undefined) {
        httpParams = httpParams.set('nome', iGrupo.nome.toString());
      }
      if (iGrupo.contagem !== undefined) {
        httpParams = httpParams.set('contagem.id', iGrupo.contagem.id.toString());
      }
      return httpParams;
    }
}
