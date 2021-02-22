import { HttpParams } from "@angular/common/http";
import { Contagem } from "./contagem";


export enum TipoContagemItemEnum{
  ARQUIVO_REFERENCIADO = "ARQUIVO_REFERENCIADO",
  TRANSACAO = "TRANSACAO"
}

export enum SubtipoItemContagemEnum{
  EE = "EE",
  SE = "SE",
  CE = "CE",
  AIE = "AIE",
  ALI = "ALI"
}

export enum ComplexidadeEnum{
  BAIXA = "BAIXA",
  MEDIA = "MEDIA",
  ALTA = "ALTA"
}

export const FuncoesArquivoREFERENCIADO: string[] = ["AIE", "ALI"];
export const FuncoesTransacao: string[] = ["EE", "SE", "CE"];

export interface IContagemItem {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  tipo?: TipoContagemItemEnum;
  td?: number;
  tr?: number;
  complexidade?: String;
  pf?: number;
  contado?: boolean;
  subtipo?: SubtipoItemContagemEnum;
}

export class ContagemItem {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  td?: number;
  tr?: number;
  complexidade?: String;
  pf?: number;
  contado?: boolean;
  subtipo?: SubtipoItemContagemEnum;
  tipo?: TipoContagemItemEnum;

  constructor(i: IContagemItem){
    this.id = i.id;
    this.contagem = i.contagem;
    this.nome = i.nome;
    this.td = i.td ? i.td : 0;
    this.tr = i.tr ? i.tr : 0;
    this.pf = i.pf ? i.pf : 0;
    this.complexidade = i.complexidade;
    this.contado = i.contado;
    this.subtipo = i.subtipo;
    this.tipo = i.tipo;
  }
  public static toHttpParams(iContagem: IContagemItem): HttpParams {
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
      if (iContagem.tipo !== undefined) {
        httpParams = httpParams.set('tipo', iContagem.tipo.toString());
      }
      if (iContagem.subtipo !== undefined) {
        httpParams = httpParams.set('subtipo', iContagem.subtipo.toString());
      }
      return httpParams;
    }
}
