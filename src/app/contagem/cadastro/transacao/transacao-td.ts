
import { HttpParams } from "@angular/common/http";
import { Transacao } from './transacao';
import { Coluna } from '../arquivo-referenciado/coluna';
import { ContagemDadoSituacao } from "../../contagem-dado-situacao.enum";

export enum TipoTransacaoTDEnum {
  ARQUIVO_REFERENCIADO = "ARQUIVO_REFERENCIADO",
  MENSAGEM = "MENSAGEM",
  ACAO = 'ACAO'
}
export class TransacaoTD {
  id: number;
  transacao: Transacao;
  coluna: Coluna;
  criado: Date;
  modificado: Date;

  // DADOS QUE FORAM ALTERADOS, USADOS EM COMPARAÇÃO, NESTE CASO, SÓ SERÃO ADICIONADOS OU EXCLUÍDOS
  alteradoDadoContagem: ContagemDadoSituacao;

  constructor(transacao?: Transacao){
    this.transacao = transacao || new Transacao();
  }

  public static toHttpParams(td: TransacaoTD): HttpParams {
    let httpParams = new HttpParams();
      return httpParams;
    }
}
