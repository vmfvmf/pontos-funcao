import { HttpParams } from "@angular/common/http";
import { Coluna } from "./coluna";


export class Tabela {
  id: number;
  nome: string;
  colunas: Coluna[];
  criado: Date;
  modificado: Date;

  // APENAS DO FRONTEND
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

