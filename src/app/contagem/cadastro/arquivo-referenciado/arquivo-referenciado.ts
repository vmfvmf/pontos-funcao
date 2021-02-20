import { HttpParams } from '@angular/common/http';
import { Contagem } from '../../contagem';
import { ComplexidadeEnum, ItemContagem, SubTipoItemContagemEnum } from './item-contagem';
import { Tabela } from './tabela';


export class IArquivoReferenciado {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  contado?: boolean;
  subtipo?: SubTipoItemContagemEnum;
  td?: number;
  tr?: number;
  pf?: number;
  complexidade?: String;
  tabelas?: Tabela[];
  isCheckSelected?: boolean;
}

export class ArquivoReferenciado extends ItemContagem {
  tr?: number;
  tabelas?: Tabela[];
  isCheckSelected?: boolean;

  constructor(i: IArquivoReferenciado) {
    super(i);
    this.tr = i.tr;
    this.tabelas = i.tabelas ? i.tabelas : [];
    this.isCheckSelected = i.isCheckSelected;
  }

  public toHttpParams(): HttpParams {
    let httpParams = super.toHttpParams();
    if (this.tr !== undefined) {
      httpParams = httpParams.set('tr', this.tr.toString());
    }
    return httpParams;
  }

}
