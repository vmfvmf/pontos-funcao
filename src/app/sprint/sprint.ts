import { HttpParams } from '@angular/common/http';
import { Projeto } from '../projeto/projeto';

export class Sprint  {
  id: number;
  numero: number;
  projeto: Projeto;
  dataInicio: Date;
  dataFim: Date;
  diasUteis: number;

  constructor(projeto?: Projeto){
    this.projeto =  projeto ? projeto : new Projeto();
  }

  public static toHttpParams(s: Sprint): HttpParams {
    let httpParams = new HttpParams();
    //let httpParams = this.paginacao.toHttpParams();

      if (s.numero !== undefined) {
        httpParams = httpParams.set('numero', s.numero.toString());
      }
      if (s.id !== undefined) {
        httpParams = httpParams.set('id', s.id.toString());
      }
      if (s.projeto !== undefined && s.projeto.id !== undefined) {
        httpParams = httpParams.set('projeto.id', s.projeto.id.toString());
      }
      return httpParams;
    }
}
