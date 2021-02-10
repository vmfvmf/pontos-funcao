import { HttpParams } from '@angular/common/http';
import { Ded } from './../deds/ded';

export interface ISprint{
  id?: number;
  numero?: number;
  ded?: Ded;
  dataInicio?: Date;
  dataFim?: Date;
  diasUteis?: number;
}

export class Sprint  {
  id?: number;
  numero?: number;
  ded?: Ded;
  dataInicio?: Date;
  dataFim?: Date;
  diasUteis?: number;

  constructor(iSprint: ISprint){
    if(iSprint.id) this.id = iSprint.id;
    if(iSprint.numero) this.numero = iSprint.numero;
    if(iSprint.ded) this.ded = iSprint.ded;
  }

  public static toHttpParams(s: ISprint): HttpParams {
    let httpParams = new HttpParams();
    //let httpParams = this.paginacao.toHttpParams();

      if (s.numero !== undefined) {
        httpParams = httpParams.set('numero', s.numero.toString());
      }
      if (s.id !== undefined) {
        httpParams = httpParams.set('id', s.id.toString());
      }
      if (s.ded !== undefined) {
        httpParams = httpParams.set('ded.id', s.ded.id.toString());
      }
      return httpParams;
    }
}
