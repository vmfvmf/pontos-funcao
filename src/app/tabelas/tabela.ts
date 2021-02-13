import { FuncaoDados } from './../contagens/contagens-detalhes/contagens-funcao-dados/funcao-dados';
import { HttpParams } from "@angular/common/http";
import { Sistema } from "../sistemas/sistema";

export interface ITabela{
  id?: number;
  nome?: string;
  colunas?: Coluna[];
}

export class Tabela {
  id?: number;
  nome?: string;
  colunas?: Coluna[];
  funcaoDados?: FuncaoDados;

  constructor(t: ITabela){
    this.id = t.id;
    this.nome = t.nome;
    this.colunas = t.colunas;
  }
  toHttpParams(): HttpParams {
    let httpParams = new HttpParams();

      if (this.id !== undefined) {
        httpParams = httpParams.set('id', this.id.toString());
      }
      if (this.nome !== undefined) {
        httpParams = httpParams.set('number', this.nome.toString());
      }
      if (this.funcaoDados !== undefined) {
        httpParams = httpParams.set('funcaoDados_id', this.funcaoDados.id.toString());
      }
      return httpParams;
    }
}
export interface IColuna{
  id?: number;
  nome?: string;
  tabela?: Tabela;
}

export class Coluna {
  id?: number;
  nome?: string;
  tabela?: Tabela;

  public static toHttpParams(c: IColuna): HttpParams {
    let httpParams = new HttpParams();

      if (c.id !== undefined) {
        httpParams = httpParams.set('id', c.id.toString());
      }
      if (c.nome !== undefined) {
        httpParams = httpParams.set('number', c.nome.toString());
      }
      if (c.tabela !== undefined) {
        httpParams = httpParams.set('tabela.id', c.tabela.id.toString());
      }
      return httpParams;
    }
}
