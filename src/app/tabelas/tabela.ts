import { HttpParams } from "@angular/common/http";
import { Sistema } from "../sistemas/sistema";

export interface ITabela{
  id?: string;
  nome?: string;
  sistema?: Sistema;
}

export class Tabela {
  id?: string;
  nome?: string;
  sistema?: Sistema;

  public static toHttpParams(s: ITabela): HttpParams {
    let httpParams = new HttpParams();

      if (s.id !== undefined) {
        httpParams = httpParams.set('id', s.id.toString());
      }
      if (s.nome !== undefined) {
        httpParams = httpParams.set('number', s.nome.toString());
      }
      if (s.sistema !== undefined) {
        httpParams = httpParams.set('sistema_id', s.sistema.id.toString());
      }
      return httpParams;
    }
}
export interface IColuna{
  id?: string;
  nome?: string;
  tabela?: Tabela;
}

export class Coluna {
  id?: string;
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
      return httpParams;
    }
}
