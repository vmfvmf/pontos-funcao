import { HttpParams } from '@angular/common/http';
import { AbstractContagemItem } from '../../abstract-contagem-item';
import { Tabela } from './tabela';

export enum FuncaoArquivoReferenciadoEnum{
  AIE = "AIE",
  ALI = "ALI"
}

export class ArquivoReferenciado extends AbstractContagemItem {
  tabelas: Tabela[];
  funcao: FuncaoArquivoReferenciadoEnum;
  isChecked: boolean;

  constructor() {
    super();
    this.tabelas = [];
    this.tipo = 'ARQUIVO_REFERENCIADO';
  }

  public static toHttpParams(arquivo: ArquivoReferenciado): HttpParams {
    let httpParams = super.toHttpParams(arquivo)

    if (arquivo.tabelas) {
      httpParams = httpParams.append('tabelas', arquivo.tabelas.join(', '));
    }

    if (arquivo.funcao) {
      httpParams = httpParams.append('funcao', arquivo.funcao.toString());
    }
    return httpParams;
  }
}
