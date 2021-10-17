import { Contagem } from './../../contagem';
import { HttpParams } from '@angular/common/http';
import { AbstractContagemItem } from '../../abstract-contagem-item';
import { Tabela } from './tabela';
import { ContagemDadoSituacao } from '../../contagem-dado-situacao.enum';

export enum FuncaoArquivoReferenciadoEnum{
  AIE = "AIE",
  ALI = "ALI"
}

export class ArquivoReferenciado extends AbstractContagemItem {
  tabelas: Tabela[];

  // USO DO FRONTEND
  isChecked: boolean;
  tdNovo: boolean;
  tdExcluido: boolean;

  constructor(contagem?: Contagem) {
    super(contagem);
    this.tabelas = [new Tabela()];
  }

  public static toHttpParams(arquivo: ArquivoReferenciado): HttpParams {
    let httpParams = super.toHttpParams(arquivo)

    if (arquivo.tabelas && arquivo.tabelas[0]) {
      httpParams = httpParams.append('tabelas', arquivo.tabelas.join(', '));
    }

    if (arquivo.funcao) {
      httpParams = httpParams.append('funcao', arquivo.funcao.toString());
    }
    return httpParams;
  }
}
