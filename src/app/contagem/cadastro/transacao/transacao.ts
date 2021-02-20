import { HttpParams } from "@angular/common/http";
import { Contagem } from "../../contagem";
import { ItemContagem, SubTipoItemContagemEnum } from "../arquivo-referenciado/item-contagem";
import { Tabela } from "../arquivo-referenciado/tabela";
import { GrupoTransacao } from "./grupo/grupo-transacao";
import { TransacaoTDColuna } from "./transacao-td-coluna";
import { TransacaoTDMensagemTela } from "./transacao-td-mensagem-tela";


export interface ITransacao {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  contado?: boolean;
  subtipo?: SubTipoItemContagemEnum;
  td?: number;
  tr?: number;
  pf?: number;
  tabelas?: Tabela[];
  grupo?: GrupoTransacao;
  complexidade?: String;
  transacaosTDMensagemTela?: TransacaoTDMensagemTela[];
  transacaosTDColunas?: TransacaoTDColuna[];
}

export class Transacao extends ItemContagem {
  grupo?: GrupoTransacao;
  transacaosTDMensagemTela?: TransacaoTDMensagemTela[];
  transacaosTDColunas?: TransacaoTDColuna[];
  contagem_id: number;

  constructor(i: ITransacao){
    super(i);
    this.grupo = i.grupo ? i.grupo : new GrupoTransacao({ });
    this.transacaosTDMensagemTela = i.transacaosTDMensagemTela ? i.transacaosTDMensagemTela : [];
    this.transacaosTDColunas = i.transacaosTDColunas ? i.transacaosTDColunas : [];
  }

  public toHttpParams(): HttpParams {
    let httpParams = super.toHttpParams();
      return httpParams;
    }
}
