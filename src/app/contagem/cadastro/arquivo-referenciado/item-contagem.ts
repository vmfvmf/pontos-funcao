import { HttpParams } from "@angular/common/http";
import { Contagem } from "../../contagem";


export enum TipoItemContagemEnum{
  FuncaoDados = "FuncaoDados",
  FuncaoTransacao = "Transacao"
}

export enum SubTipoItemContagemEnum{
  EE = "Entrada Externa",
  SE = "Saída Externa",
  CE = "Consulta Externa",
  AIE = "Arquivo de Interface Externa",
  ALI = "Arquivo Lógico Interno"
}

export enum ComplexidadeEnum{
  baixa = "Baixa",
  media = "Média",
  alta = "Alta"
}

export const FuncoesArquivoLogico: string[] = ["Arquivo de Interface Externa", "Arquivo Lógico Interno"];
export const FuncoesTransacao: string[] = ["Entrada Externa", "Saída Externa", "Consulta Externa"];

export interface IItemContagem {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  td?: number;
  tr?: number;
  complexidade?: String;
  pf?: number;
  contado?: boolean;
  subtipo?: SubTipoItemContagemEnum;
  dtype?: string;
}

export abstract class ItemContagem {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  td?: number;
  tr?: number;
  complexidade?: String;
  pf?: number;
  contado?: boolean;
  subtipo?: SubTipoItemContagemEnum;
  dtype?: string;

  constructor(i: IItemContagem){
    this.id = i.id;
    this.contagem = i.contagem;
    this.nome = i.nome;
    this.td = i.td;
    this.tr = i.tr;
    this.pf = i.pf;
    this.complexidade = i.complexidade;
    this.contado = i.contado;
    this.subtipo = i.subtipo;
    this.dtype = i.dtype;
  }
  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams();

      if (this.id !== undefined) {
        httpParams = httpParams.set('id', this.id.toString());
      }
      if (this.contagem !== undefined && this.contagem.id !== undefined) {
        httpParams = httpParams.set('contagem.id', this.contagem.id.toString());
      }
      if (this.nome !== undefined) {
        httpParams = httpParams.set('nome', this.nome.toString());
      }
      if (this.td !== undefined) {
        httpParams = httpParams.set('td', this.td.toString());
      }
      if (this.tr !== undefined) {
        httpParams = httpParams.set('tr', this.tr.toString());
      }
      if (this.pf !== undefined) {
        httpParams = httpParams.set('pf', this.pf.toString());
      }
      if (this.complexidade !== undefined) {
        httpParams = httpParams.set('complexidade', this.complexidade.toString());
      }
      return httpParams;
    }
}
