import { HttpParams } from "@angular/common/http";
import { ArquivoReferenciado } from "./arquivo-referenciado";

export interface ITabela{
  id?: number;
  nome?: string;
  colunas?: Coluna[];
  arquivoReferenciado?: ArquivoReferenciado;
  isCheckSelected?: boolean;
}

export class Tabela {
  id?: number;
  nome?: string;
  colunas?: Coluna[];
  arquivoReferenciado?: ArquivoReferenciado;
  isCheckSelected?: boolean;

  constructor(t: ITabela){
    this.id = t.id;
    this.nome = t.nome;
    this.colunas = t.colunas ? t.colunas : [];
    this.arquivoReferenciado = t.arquivoReferenciado;
    this.isCheckSelected = this.isCheckSelected;
  }
  toHttpParams(): HttpParams {
    let httpParams = new HttpParams();

      if (this.id !== undefined) {
        httpParams = httpParams.set('id', this.id.toString());
      }
      if (this.nome !== undefined) {
        httpParams = httpParams.set('number', this.nome.toString());
      }
      if (this.arquivoReferenciado !== undefined) {
        httpParams = httpParams.set('funcaoDados_id', this.arquivoReferenciado.id.toString());
      }
      return httpParams;
    }
}
export interface IColuna{
  id?: number;
  nome?: string;
  tabela?: Tabela;
  isCheckSelected?: boolean;
}

export class Coluna {
  id?: number;
  nome?: string;
  tabela?: Tabela;
  isCheckSelected?: boolean;

  constructor(i: IColuna){
    this.id = i.id;
    this.nome = i.nome;
    this.tabela = i.tabela;
    this.isCheckSelected = i.isCheckSelected;
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
