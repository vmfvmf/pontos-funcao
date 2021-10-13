import { HttpParams } from "@angular/common/http";
export class Sistema {
  id: number;
  nome: string;
  versao: string;

  constructor() {
  }

  public static toHttpParams(s: Sistema): HttpParams {
    let httpParams = new HttpParams();
    //let httpParams = this.paginacao.toHttpParams();
    if (!s) {
      return httpParams;
    }

    if (s.id !== undefined) {
      httpParams = httpParams.set("id", s.id.toString());
    }
    if (s.nome !== undefined) {
      httpParams = httpParams.set("number", s.nome.toString());
    }
    if (s.versao !== undefined) {
      httpParams = httpParams.set("versao", s.versao.toString());
    }
    return httpParams;
  }
}
