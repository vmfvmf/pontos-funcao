import { TipoContagemItemEnum } from '../../contagem-item';
import { HttpParams } from '@angular/common/http';
import { Contagem } from '../../contagem';
import { ComplexidadeEnum, ContagemItem, SubtipoItemContagemEnum } from '../../contagem-item';
import { Tabela } from './tabela';


export class IArquivoReferenciado {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  contado?: boolean;
  tipo?: TipoContagemItemEnum;
  subtipo?: SubtipoItemContagemEnum;
  td?: number;
  tr?: number;
  pf?: number;
  complexidade?: String;
  tabelas?: Tabela[];
  isCheckSelected?: boolean;
}

export class ArquivoReferenciado extends ContagemItem {
  tr?: number;
  tabelas?: Tabela[];
  isCheckSelected?: boolean;

  constructor(i: IArquivoReferenciado) {
    super(i);
    this.tipo = TipoContagemItemEnum.ARQUIVO_REFERENCIADO;
    this.tabelas = i.tabelas ? i.tabelas : [];
    this.isCheckSelected = i.isCheckSelected;
  }
}
