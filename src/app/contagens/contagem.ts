import { HttpParams } from "@angular/common/http";
import { Sistema } from "../sistemas/sistema";
import { Sprint } from "../sprints/sprint";

export enum EscopoContagemEnum{
  SISTEMA,
  PROJETO,
  SPRINT
}

export class IContagem {
  id?: number;
  sistema?: Sistema;
  sprint?: Sprint;
  dataContagem?: Date;
  contador?: String;
  escopo?: EscopoContagemEnum;
}

export class Contagem {
  id?: number;
  sistema?: Sistema;
  sprint?: Sprint;
  dataContagem?: Date;
  contador?: String;
  escopo?: EscopoContagemEnum;

  public static toHttpParams(s: IContagem): HttpParams {
    let httpParams = new HttpParams();
    //let httpParams = this.paginacao.toHttpParams();
      if (s.id !== undefined) {
        httpParams = httpParams.set('id', s.id.toString());
      }
      if (s.sistema !== undefined && s.sistema.id !== undefined) {
        httpParams = httpParams.set('sistema.id', s.sistema.id.toString());
      }
      if (s.sprint !== undefined && s.sprint.id !== undefined) {
        httpParams = httpParams.set('sprint.id', s.sprint.id.toString());
      }
      if (s.dataContagem !== undefined) {
        httpParams = httpParams.set('dataContagem', s.dataContagem.toString());
      }
      if (s.contador !== undefined) {
        httpParams = httpParams.set('contador', s.contador.toString());
      }
      if (s.escopo !== undefined) {
        httpParams = httpParams.set('escopo', s.escopo.toString());
      }
      return httpParams;
    }
}
