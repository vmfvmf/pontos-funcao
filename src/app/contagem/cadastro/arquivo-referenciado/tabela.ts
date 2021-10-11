import { HttpParams } from "@angular/common/http";
import { AbstractContagemItem } from "../../abstract-contagem-item";


export class Tabela {
  id: number;
  nome: string;
  colunas: Coluna[];
  isChecked: boolean;

  constructor(nome?: string){
    this.nome = nome;
    this.colunas = [];
    this.isChecked = this.isChecked;
  }
  public static toHttpParams(iTabela: Tabela): HttpParams {
    let httpParams = new HttpParams();

      if (iTabela.id !== undefined) {
        httpParams = httpParams.set('id', iTabela.id.toString());
      }
      if (iTabela.nome !== undefined) {
        httpParams = httpParams.set('id', iTabela.nome.toString());
      }
      if (iTabela.colunas !== undefined) {
        httpParams = httpParams.set('colunas', iTabela.colunas.join(',').toString());
      }
      if (iTabela.colunas !== undefined) {
        httpParams = httpParams.set('colunas', iTabela.colunas.join(',').toString());
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
  isChecked?: boolean;

  constructor(i: IColuna){
    this.id = i.id;
    this.nome = i.nome;
    this.tabela = i.tabela;
    this.isChecked = i.isCheckSelected;
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
