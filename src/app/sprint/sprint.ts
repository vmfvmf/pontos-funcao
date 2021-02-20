import { HttpParams } from '@angular/common/http';
import { Ded } from '../ded/ded';

export interface ISprint{
  id?: number;
  numero?: number;
  ded?: Ded;
  dataInicio?: Date;
  dataFim?: Date;
  diasUteis?: number;
  // contagens?: Contagem[];
}

export class Sprint  {
  id?: number;
  numero?: number;
  ded?: Ded;
  dataInicio?: Date;
  dataFim?: Date;
  diasUteis?: number;
  // contagens?: Contagem[];

  constructor(i: ISprint){
    this.id = i.id;
    this.numero = i.numero;
    this.ded = i.ded ? i.ded : new Ded({});
    this.dataInicio = i.dataInicio;
    this.dataFim = i.dataFim;
    this.diasUteis = i.diasUteis;
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
      if (s.ded !== undefined && s.ded.id !== undefined) {
        httpParams = httpParams.set('ded.id', s.ded.id.toString());
      }
      return httpParams;
    }
}
