import { HttpParams } from "@angular/common/http";

export class Coluna {
  id: number;
  nome: string;
  criado: Date;
  modificado: Date;

  // APENAS DO FRONTEND
  isChecked: boolean;

  constructor(nome?: string){
    this.nome = nome;
  }

  public static toHttpParams(c: Coluna): HttpParams {
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
