import { HttpParams } from '@angular/common/http';
import { Tabela } from 'src/app/contagens/tabela';
import { Contagem } from '../../contagem';
import {
  ComplexidadeEnum,
  ItemContagem,
  SubTipoItemContagemEnum,
  TipoItemContagemEnum,
} from '../../item-contagem';

export class IFuncaoDados {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  contado?: boolean;
  subtipo?: SubTipoItemContagemEnum;
  td?: number;
  tr?: number;
  pf?: number;
  complexidade?: string;
  tabelas?: Tabela[];
}

export class FuncaoDados extends ItemContagem {
  tr?: number;
  tabelas?: Tabela[];

  constructor(i: IFuncaoDados) {
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

  public analisaComplexidade() {
    if ((this.td < 50 && this.tr == 1) || (this.td < 20 && this.tr <= 5)) {
      this.complexidade = ComplexidadeEnum.baixa;
    } else if (
      (this.td > 50 && this.tr == 1) ||
      (this.td >= 20 && this.td <= 50 && this.tr <= 5)
    ) {
      this.complexidade = ComplexidadeEnum.media;
    } else {
      this.complexidade = ComplexidadeEnum.alta;
    }
  }

  public analisaValor() {
    switch (this.subtipo) {
      case SubTipoItemContagemEnum.ALI:
        switch (this.complexidade) {
          case ComplexidadeEnum.baixa:
            this.pf = 7;
            break;
          case ComplexidadeEnum.media:
            this.pf = 10;
            break;
          case ComplexidadeEnum.alta:
            this.pf = 15;
            break;
        }
        break;
      case SubTipoItemContagemEnum.AIE:
        switch (this.complexidade) {
          case ComplexidadeEnum.baixa:
            this.pf = 5;
            break;
          case ComplexidadeEnum.media:
            this.pf = 7;
            break;
          case ComplexidadeEnum.alta:
            this.pf = 10;
            break;
        }
    }
  }
}
