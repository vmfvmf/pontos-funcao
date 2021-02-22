import { HttpParams } from "@angular/common/http";

export interface IMensagemTela{
  id?: number;
  nome?: string;
  isChecked?: boolean;
}

export class MensagemTela{
  id?: number;
  nome?: string;
  isChecked?: boolean;

  constructor(i: IMensagemTela){
    this.id = i.id;
    this.nome = i.nome;
    this.isChecked = i.isChecked ? i.isChecked : false;
  }
  public static toHttpParams(iMsg: IMensagemTela): HttpParams {
    let httpParams = new HttpParams();
      if (iMsg.nome !== undefined) {
        httpParams = httpParams.set('nome', iMsg.nome.toString());
      }
      return httpParams;
    }
}
