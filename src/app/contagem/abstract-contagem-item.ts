import { FuncaoArquivoReferenciadoEnum } from './cadastro/arquivo-referenciado/arquivo-referenciado';
import { HttpParams } from "@angular/common/http";
import { Contagem } from "./contagem";
import { ContagemDadoSituacao } from './contagem-dado-situacao.enum';


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
  td: number;
  tr: number;
  complexidade: ComplexidadeEnum;
  pf: number;
  criado: Date;
  modificado: Date;
  funcao: FuncaoArquivoReferenciadoEnum | FuncaoTransacaoEnum;

  // PROPRIEDADES DE COMPARAÇÃO
  alteradoDadoContagem: ContagemDadoSituacao;
	alteradoTd: number;
	alteradoTr: number;
	alteradoComplexidade: ComplexidadeEnum;
	alteradoPf: number;
	alteradoFuncao: FuncaoTransacaoEnum | FuncaoArquivoReferenciadoEnum;

  constructor(contagem?: Contagem){
    this.contagem = contagem? contagem : new Contagem()
  }

  public static toHttpParams(contagem: AbstractContagemItem): HttpParams {
    let httpParams = new HttpParams();

      if (contagem.id !== undefined) {
        httpParams = httpParams.set('id', contagem.id.toString());
      }
      if (contagem.contagem !== undefined && contagem.contagem.id !== undefined) {
        httpParams = httpParams.set('contagem.id', contagem.contagem.id.toString());
      }
      if (contagem.nome !== undefined) {
        httpParams = httpParams.set('nome', contagem.nome.toString());
      }
      if (contagem.funcao !== undefined) {
        httpParams = httpParams.set('funcao', contagem.funcao.toString());
      }
      if (contagem.td !== undefined) {
        httpParams = httpParams.set('td', contagem.td.toString());
      }
      if (contagem.tr !== undefined) {
        httpParams = httpParams.set('tr', contagem.tr.toString());
      }
      if (contagem.pf !== undefined) {
        httpParams = httpParams.set('pf', contagem.pf.toString());
      }
      if (contagem.complexidade !== undefined) {
        httpParams = httpParams.set('complexidade', contagem.complexidade.toString());
      }
      return httpParams;
    }
}
