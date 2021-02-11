import { HttpParams } from "@angular/common/http";

export interface ISistema{
  id?: number;
  nome?: string;
  versao?: string;
}

export class Sistema {
  id?: number;
  nome?: string;
  versao?: string;

  constructor(iSistema: ISistema){
    this.id = iSistema.id;
    this.nome = iSistema.nome;
    this.versao = iSistema.versao;
  }

  public static toHttpParams(s: ISistema): HttpParams {
    let httpParams = new HttpParams();
    //let httpParams = this.paginacao.toHttpParams();

      if (s.id !== undefined) {
        httpParams = httpParams.set('id', s.id.toString());
      }
      if (s.nome !== undefined) {
        httpParams = httpParams.set('number', s.nome.toString());
      }
      if (s.versao !== undefined) {
        httpParams = httpParams.set('versao', s.versao.toString());
      }
      return httpParams;
    }

}
