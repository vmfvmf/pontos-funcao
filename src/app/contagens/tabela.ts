import { FuncaoDados } from './contagens-detalhes/contagens-funcao-dados/funcao-dados';
import { HttpParams } from "@angular/common/http";
import { Sistema } from "../sistemas/sistema";

export interface ITabela{
  id?: number;
  nome?: string;
  colunas?: Coluna[];
  funcaoDados?: FuncaoDados;
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
    this.funcaoDados = t.funcaoDados;
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

  constructor(i: IColuna){
    this.id = i.id;
    this.nome = i.nome;
    this.tabela = i.tabela;
  }

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
