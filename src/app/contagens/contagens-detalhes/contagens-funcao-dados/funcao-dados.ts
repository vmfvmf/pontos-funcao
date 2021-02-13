import { HttpParams } from "@angular/common/http";
import { Tabela } from "src/app/tabelas/tabela";
import { Contagem } from "../../contagem";
import { ItemContagem, SubTipoItemContagemEnum, TipoItemContagemEnum } from "../../item-contagem";

export class IFuncaoDados {
  id?: number;
  contagem?: Contagem;
  valor?: number;
  nome?: String;
  td?: number;
  contado?: boolean;
  subtipo?: SubTipoItemContagemEnum;
  tr?: number;
  tabelas?: Tabela[];
}

export class FuncaoDados extends ItemContagem {
  tr?: number;
  tabelas?: Tabela[];

  constructor(i: IFuncaoDados){
    super(i);
    this.tr = i.tr;
    this.tabelas = i.tabelas;
  }

  public toHttpParams(): HttpParams {
    let httpParams = super.toHttpParams();
      if (this.tr !== undefined) {
        httpParams = httpParams.set('tr', this.tr.toString());
      }
      return httpParams;
    }
}
