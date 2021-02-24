import { HttpParams } from "@angular/common/http";
import { Contagem } from "../../contagem";
import { ContagemItem, SubtipoItemContagemEnum, TipoContagemItemEnum } from "../../contagem-item";
import { Tabela } from "../arquivo-referenciado/tabela";
import { Grupo } from "./grupo/grupo";
import { TransacaoTD } from "./transacao-td";


export interface ITransacao {
  id?: number;
  contagem?: Contagem;
  nome?: String;
  contado?: boolean;
  subtipo?: SubtipoItemContagemEnum;
  td?: number;
  tr?: number;
  pf?: number;
  grupo?: Grupo;
  complexidade?: String;
  transacaoTDs?: TransacaoTD[];
}

export class Transacao extends ContagemItem {
  grupo?: Grupo;
  transacaoTDs?: TransacaoTD[];

  constructor(i: ITransacao){
    super(i);
    this.tipo = TipoContagemItemEnum.TRANSACAO;
    this.grupo = i.grupo ? i.grupo : new Grupo({ });
    this.transacaoTDs = i.transacaoTDs ? i.transacaoTDs : [];
  }

}
