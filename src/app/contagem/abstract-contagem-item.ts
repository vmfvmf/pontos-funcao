import { HttpParams } from "@angular/common/http";
import { Contagem } from "./contagem";


export enum TipoContagemItemEnum{
  ARQUIVO_REFERENCIADO = "ARQUIVO_REFERENCIADO",
  TRANSACAO = "TRANSACAO"
}

export enum FuncaoTransacaoEnum{
  EE = "EE",
  SE = "SE",
  CE = "CE"
}

export enum ComplexidadeEnum{
  BAIXA = "BAIXA",
  MEDIA = "MEDIA",
  ALTA = "ALTA"
}

export const FuncoesArquivoREFERENCIADO: string[] = ["AIE", "ALI"];
export const FuncoesTransacao: string[] = ["EE", "SE", "CE"];


export abstract class AbstractContagemItem {
  id: number;
  contagem: Contagem;
  nome: String;
  tipo: String;
  td: number;
  tr: number;
  complexidade: ComplexidadeEnum;
  pf: number;
  contado: boolean;

  constructor(){
    this.contagem = new Contagem()
    this.contado = false;
  }

  public static toHttpParams(iContagem: AbstractContagemItem): HttpParams {
    let httpParams = new HttpParams();

      if (iContagem.id !== undefined) {
        httpParams = httpParams.set('id', iContagem.id.toString());
      }
      if (iContagem.contagem !== undefined && iContagem.contagem.id !== undefined) {
        httpParams = httpParams.set('contagem.id', iContagem.contagem.id.toString());
      }
      if (iContagem.nome !== undefined) {
        httpParams = httpParams.set('nome', iContagem.nome.toString());
      }
      if (iContagem.tipo !== undefined) {
        httpParams = httpParams.set('tipo', iContagem.tipo.toString());
      }
      if (iContagem.td !== undefined) {
        httpParams = httpParams.set('td', iContagem.td.toString());
      }
      if (iContagem.tr !== undefined) {
        httpParams = httpParams.set('tr', iContagem.tr.toString());
      }
      if (iContagem.pf !== undefined) {
        httpParams = httpParams.set('pf', iContagem.pf.toString());
      }
      if (iContagem.complexidade !== undefined) {
        httpParams = httpParams.set('complexidade', iContagem.complexidade.toString());
      }
      return httpParams;
    }
}
