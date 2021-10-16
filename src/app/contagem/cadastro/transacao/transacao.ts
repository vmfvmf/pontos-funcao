import { Contagem } from './../../contagem';
import { FuncaoTransacaoEnum } from './../../abstract-contagem-item';

import { AbstractContagemItem} from "../../abstract-contagem-item";
import { Grupo } from "./grupo/grupo";
import { TransacaoTD } from "./transacao-td";
import { HttpParams } from '@angular/common/http';

export class Transacao extends AbstractContagemItem {
  grupo: Grupo;
  transacaoTDs: TransacaoTD[];
  acao: boolean;
  mensagem: boolean;

  // DADOS QUE FORAM ALTERADOS, USADOS EM COMPARAÇÃO
  alteradoGrupo: Grupo;
	alteradoAcao: boolean;
	alteradoMensagem: boolean;

  constructor(contagem?: Contagem){
    super();
    this.grupo = new Grupo();
    this.transacaoTDs = [];
    this.contagem = contagem || new Contagem();
  }

  public static toHttpParams(transacao: Transacao): HttpParams {
    let httpParams = super.toHttpParams(transacao)

    if (transacao.transacaoTDs && transacao.transacaoTDs[0]) {
      httpParams = httpParams.append('transacaoTDs', transacao.transacaoTDs.join(', '));
    }

    if (transacao.acao) {
      httpParams = httpParams.append('acao', transacao.acao.toString());
    }

    if (transacao.grupo.id) {
      httpParams = httpParams.append('grupo.id', transacao.grupo.id.toString());
    }

    if (transacao.mensagem) {
      httpParams = httpParams.append('mensagem', transacao.mensagem.toString());
    }

    if (transacao.funcao) {
      httpParams = httpParams.append('funcao', transacao.funcao.toString());
    }
    return httpParams;
  }

}
