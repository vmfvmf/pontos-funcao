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
    this.isChecked = i.isChecked;
  }
  toHttpParams(): HttpParams {
    let httpParams = new HttpParams();
      if (this.nome !== undefined) {
        httpParams = httpParams.set('nome', this.nome.toString());
      }
      return httpParams;
    }
}
