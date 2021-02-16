import { TransacaoTD } from './transacaotd';
import { GrupoTransacao } from './contagens-grupo-transacoes/grupo-transacao';
import { HttpParams } from "@angular/common/http";
import { Tabela } from "src/app/contagens/tabela";
import { Contagem } from "../../contagem";
import { ItemContagem, SubTipoItemContagemEnum } from "../../item-contagem";

export interface ITransacao {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  contado?: boolean;
  subtipo?: SubTipoItemContagemEnum;
  td?: number;
  tr?: number;
  pf?: number;
  tabelas?: Tabela[];
  grupo?: GrupoTransacao;
  transacoesTD?: TransacaoTD[];
}

export class Transacao extends ItemContagem {
  grupo?: GrupoTransacao;
  transacoesTD?: TransacaoTD[];

  constructor(i: ITransacao){
    super(i);
    this.grupo = i.grupo;
    this.transacoesTD = i.transacoesTD;
  }

  public toHttpParams(): HttpParams {
    let httpParams = super.toHttpParams();
      return httpParams;
    }
}
