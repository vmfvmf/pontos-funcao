import { HttpParams } from "@angular/common/http";
import { Contagem } from "./contagem";

export enum TipoItemContagemEnum{
  FuncaoDados = "Função de Dados",
  FuncaoTransacao = "Função de Transação"
}

export enum SubTipoItemContagemEnum{
  EE = "Entrada Externa",
  SE = "Saída Externa",
  CE = "Consulta Externa",
  AIE = "Arquivo de Interface Externa",
  ALI = "Arquivo Lógico Interno"
}

export const FuncoesArquivoLogico: string[] = ["Arquivo de Interface Externa", "Arquivo Lógico Interno"];

export interface IItemContagem {
  id?: number;
  contagem?: Contagem;
  valor?: number;
  nome?: String;
  td?: number;
  contado?: boolean;
  subtipo?: SubTipoItemContagemEnum;
}

export abstract class ItemContagem {
  id?: number;
  contagem?: Contagem;
  // dtype: TipoItemContagemEnum;
  valor?: number;
  nome?: String;
  td?: number;
  contado?: boolean;
  subtipo?: SubTipoItemContagemEnum;

  constructor(i: IItemContagem){
    this.id = i.id;
    this.contagem = i.contagem;
    this.valor = i.valor;
    this.nome = i.nome;
    this.td = i.td;
    this.contado = i.contado;
    this.subtipo = i.subtipo;
  }
  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams();

      if (this.id !== undefined) {
        httpParams = httpParams.set('id', this.id.toString());
      }
      if (this.contagem !== undefined && this.contagem.id !== undefined) {
        httpParams = httpParams.set('contagem.id', this.contagem.id.toString());
      }
      if (this.valor !== undefined) {
        httpParams = httpParams.set('valor', this.valor.toString());
      }
      if (this.nome !== undefined) {
        httpParams = httpParams.set('nome', this.nome.toString());
      }
      if (this.td !== undefined) {
        httpParams = httpParams.set('td', this.td.toString());
      }
      return httpParams;
    }
}
