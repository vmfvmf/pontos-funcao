import { HttpParams } from "@angular/common/http";
import { ContagemDadoSituacao } from "../../contagem-dado-situacao.enum";
import { Coluna } from "./coluna";


export class Tabela {
  id: number;
  nome: string;
  colunas: Coluna[];
  criado: Date;
  modificado: Date;

  // APENAS DO FRONTEND
  isChecked: boolean;
  tdNovo: boolean;
  tdExcluido: boolean;

  // DADOS QUE FORAM ALTERADOS, USADOS EM COMPARAÇÃO
  alteradoDadoContagem: ContagemDadoSituacao;
	alteradoNome: string;
	alteradoColunas: string;

  constructor(nome?: string){
    this.nome = nome;
    this.colunas = [new Coluna()];
    this.isChecked = this.isChecked;
  }
  public static toHttpParams(iTabela: Tabela): HttpParams {
    let httpParams = new HttpParams();

      if (iTabela.id !== undefined) {
        httpParams = httpParams.set('id', iTabela.id.toString());
      }
      if (iTabela.nome !== undefined) {
        httpParams = httpParams.set('id', iTabela.nome.toString());
      }
      if (iTabela.colunas !== undefined) {
        httpParams = httpParams.set('colunas', iTabela.colunas.join(',').toString());
      }
      if (iTabela.colunas !== undefined) {
        httpParams = httpParams.set('colunas', iTabela.colunas.join(',').toString());
      }
      return httpParams;
    }
}

